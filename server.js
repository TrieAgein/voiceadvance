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
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} - ${req.path}`);
    console.log(`Body: ${JSON.stringify(req.body)}`);
    next();
});
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).json({ error: "Bad request: JSON parsing error. Please check your JSON payload." });
    }
    next();
});
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

    // READ all users
    app.get('/getua', async (req, res) => {
        const users = await prisma.user.findMany();
        res.json(users);
    });

	// READ all comments
	app.get('/getca', async (req, res) => {
        const comments = await prisma.comment.findMany();
        res.json(comments);
    });
	
	// READ all comments from a given user
	app.get('/getcu/:id', async (req, res) => {
		const user_id = parseInt(req.params.id);
        const user = await prisma.user.findUnique({
			where: { user_id },
			select: { comments: true },
		});
        res.json(user);
    });
	
	//READ comments in multiples of 10
	app.get('/getcpage/:pg', async (req, res) => {
		const comments = await prisma.comment.findMany({
			skip: parseInt(req.params.pg),
			take: 10,
		})
		res.json(comments);	
	});
	
	//READ 'lim' number of comments
	app.get('/getclimit/:lim', async (req, res) => {
		const comments = await prisma.comment.findMany({
			take: parseInt(req.params.lim),
		})
		res.json(comments);	
	});
	
	//READ comments which topics contain 'input'
	app.get('/getcsearch', async (req, res) => {
		const comments = await prisma.comment.findMany({
			where: {
				topic: {
					contains: req.body.search,
					mode: 'insensitive',
				},
			},
		})
		res.json(comments);	
	});

    // READ: Get a single user by user_id
    app.get('/getu/:id', async (req, res) => {
        const user_id = parseInt(req.params.id);
        const user = await prisma.user.findUnique({
            where: { user_id },
        });
        if (!user) return res.status(404).send('user not found');
        res.status(200).json(user);
    });

    // READ: Get a single comment by comment_id
    app.get('/getc/:id', async (req, res) => {
        const comment_id = parseInt(req.params.id);
        const comment = await prisma.comment.findUnique({
            where: { comment_id },
        });
        if (!comment) return res.status(404).send('comment not found');
        res.status(200).json(comment);
    });
	
	// READ: Get all comments by user_id
	app.get('/getcu/:id', async(req, res) => {
		const user_id = parseInt(req.params.user_id);
		const comments = await prisma.comment.findMany({
			where: { user_id },
		});
		if (!comments) return res.status(404).send('comment not found');
		res.status(200).json(comments);
	});

    // UPDATE: Update a user by id
    app.put('/update/:id', async (req, res) => {
        const user_id = parseInt(req.params.id);
        try {
            const user = await prisma.user.update({
                where: { user_id },
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
	
	// UPDATE: Update upvote +1 (add like)
    app.put('/upvote/:id', async (req, res) => {
        const comment_id = parseInt(req.params.id);
        try {
            const comment = await prisma.comment.update({
                where: { comment_id },
                data: { upvotes: {increment: 1}},
            });
            res.json(comment);
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).send('comment not found');
            } else {
                res.status(500).send('An error occurred while upvoting the comment');
            }
        }
    });
	
	//Update: Update upvote -1 (remove like)
    app.put('/unupvote/:id', async (req, res) => {
        const comment_id = parseInt(req.params.id);
        try {
            const comment = await prisma.comment.update({
                where: { comment_id },
                data: { upvotes: {decrement: 1}},
            });
            res.json(comment);
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).send('comment not found');
            } else {
                res.status(500).send('An error occurred while un-upvoting the comment');
            }
        }
    });
	
	//Update: Update comment as resolved and show feedback
    app.put('/resolve/:id', async (req, res) => {
        const comment_id = parseInt(req.params.id);
        try {
            const comment = await prisma.comment.update({
                where: { comment_id },
                data: { 
					resolved: true,
					feedback: req.body.feedback,
				},
            });
            res.json(comment);
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).send('comment not found');
            } else {
                res.status(500).send('An error occurred while un-upvoting the comment');
            }
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