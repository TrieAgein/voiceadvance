import prisma from '../../utils/prismaClient.js';

export default async function handler(req, res) {
    // Check for the correct HTTP method (e.g., GET)
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const users = await prisma.user.findMany({
            select: {
                name: true,
            }
        });

        // Send the fetched data as a JSON response
        res.status(200).json(users);
    } catch (error) {
        console.error('Failed to fetch users:', error);
        // Send a more generic error message to the client (do not expose specific error details)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}