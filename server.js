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

    let items = [{ id: 1, name: 'Test Item 1' }, { id: 2, name: 'Test Item 2' }];
    
    // Place your Express CRUD API routes here
    // CREATE an item
    app.post('/items', async (req, res) => {
        const { name } = req.body;
        const item = await prisma.item.create({
        data: {
            name,
        },
        });
        res.json(item);
    });

    // READ all items
    app.get('/items', async (req, res) => {
        const items = await prisma.item.findMany();
        res.json(items);
    });

    // READ: Get a single item by id
    app.get('/items/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const item = await prisma.item.findUnique({
            where: { id },
        });
        if (!item) return res.status(404).send('Item not found');
        res.status(200).json(item);
    });

    // UPDATE: Update an item by id
    app.put('/items/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            const item = await prisma.item.update({
                where: { id },
                data: { name: req.body.name },
            });
            res.json(item);
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).send('Item not found');
            } else {
                res.status(500).send('An error occurred while updating the item');
            }
        }
    });

    // DELETE: Delete an item by id
    app.delete('/items/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            await prisma.item.delete({
                where: { id },
            });
            res.status(204).send();
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).send('Item not found');
            } else {
                res.status(500).send('An error occurred while deleting the item');
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
