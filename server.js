const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const prisma = new PrismaClient();

nextApp.prepare().then(() => {
const app = express();
app.use(bodyParser.json());
app.use(express.json());

// Place your Express CRUD API routes here
// CREATE an item
app.post('/post', async (req, res) => {
    const { name } = req.body;
    const { email } = req.body;
    const user = await prisma.user.create({
    data: {
        name,
        email
    },
    });
    res.json(user);
});

// READ all items
app.get('/get', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// READ: Get a single item by id
app.get('/get/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
        where: { id },
    });
    if (!user) return res.status(404).send('user not found');
    res.status(200).json(user);
});

// UPDATE: Update an item by id
app.put('/update/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const user = await prisma.user.update({
            where: { id },
            data: { name: req.body.name, email: req.body.email },
        });
        res.json(user);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).send('user not found');
        } else {
            res.status(500).send('An error occurred while updating the user');
        }
    }
});

// DELETE: Delete an item by id
app.delete('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.user.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).send('user not found');
        } else {
            res.status(500).send('An error occurred while deleting the user');
        }
    }
});

app.get('/get-user/:userId', async (req, res) => {
    const { userId } = req.params;

    // Simple validation to check if userId is provided
    if (!userId) {
        return res.status(400).json({ error: 'User ID is required.' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                user_id: parseInt(userId, 10), // Ensure the userId is parsed as an integer
            },
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
});


app.post('/create-user', async (req, res) => {
    const { password, name, email, anonymous } = req.body;

    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // Check if the email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email.' });
        }

        const newUser = await prisma.user.create({
            data: {
                password,
                name,
                email,
                anonymous,
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: `An error occurred: ${error.message}` });
    }
});


// POST endpoint for submitting a comment
app.post('/submit-comment', async (req, res) => {
    // Destructuring the expected fields from the request body based on the new schema
    const { name, topic, content, authorId, feedback, resolved = false } = req.body;
  
    try {
      const newComment = await prisma.comment.create({
        data: {
          name,
          topic,
          content,
          upvotes: 0, // Defaulting upvotes to 0 for new comments
          authorId, // Assuming the authorId is provided and valid
          resolved,
          feedback
        },
      });
      res.status(201).json(newComment);
    } catch (error) {
      res.status(400).json({ error: `An error occurred: ${error.message}` });
    }
  });  

app.get('/comments', async (req, res) => {
  try {
    const comments = await prisma.comment.findMany();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: `An error occurred: ${error.message}` });
  }
});

// Next.js page handling should be the last route to catch any requests not handled by Express
app.all('*', (req, res) => {
    return handle(req, res);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
});