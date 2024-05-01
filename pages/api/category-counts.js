// pages/api/category-counts.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const categories = await prisma.comment.groupBy({
                by: ['category'],
                _count: {
                    category: true,
                },
                where: {
                    category: {
                        not: null, // Excludes null categories
                    },
                },
            });
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: `Failed to fetch category counts: ${error.message}` });
        }
    } else {
        // If the request is not a GET, inform the client that only GET is allowed
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
