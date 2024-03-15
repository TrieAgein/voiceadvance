    const express = require('express');
    const next = require('next');
    const { PrismaClient } = require('@prisma/client');

    const port = parseInt(process.env.PORT, 10) || 3000;
    const dev = process.env.NODE_ENV !== 'production';
    const nextApp = next({ dev });
    const handle = nextApp.getRequestHandler();
    const prisma = new PrismaClient();

    nextApp.prepare().then(() => {
    const app = express();
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

    // Next.js page handling should be the last route to catch any requests not handled by Express
    app.all('*', (req, res) => {
        return handle(req, res);
    });

    app.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
    });
