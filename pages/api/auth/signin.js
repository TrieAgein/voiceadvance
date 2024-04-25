import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    // This should only handle API logic
    if (req.method === 'POST') {
        const { email, password } = req.body;

        try {
            // Fetch user by email
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Compare submitted password with stored hashed password
            const isValid = bcrypt.compareSync(password, user.password);

            if (!isValid) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // Assume some logic to create a session or token goes here
            // For now, just return a success message
            res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email }});
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        // Not allowed method handler
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
