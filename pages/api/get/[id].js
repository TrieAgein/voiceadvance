import prisma from '../../../utils/prismaClient.js';

export default async function handler(req, res) {
    // Validate ID input; ensure it's a number and not negative
    const id = parseInt(req.query.id);
    if (isNaN(id) || id < 1) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id },
            // Optionally, specify fields to fetch if not all data is needed
            select: {
                id: true,
                name: true,
                email: true, // Consider privacy concerns
                // other fields you might need
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Failed to fetch user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
