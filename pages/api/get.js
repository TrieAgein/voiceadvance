import { PrismaClient } from '@prisma/client';

// PrismaClient is intended to be used in a long-lived manner, so it's often better to instantiate it outside of the handler if possible
const prisma = new PrismaClient();

export default async function handler(req, res) {
    // Check for the correct HTTP method (e.g., GET)
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        // Fetch all users from the database
        const users = await prisma.user.findMany({
            // Optionally, you can specify certain fields to select if you do not want to expose all user data
            select: {
                user_id: true,
                name: true,
                email: true, // Consider security implications of exposing emails
                // other fields can be added here
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
