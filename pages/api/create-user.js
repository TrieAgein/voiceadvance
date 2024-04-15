import prisma from '../../utils/prismaClient.js';
import bcrypt from 'bcryptjs'; // Ensure you have 'bcryptjs' installed: npm install bcryptjs

export default async function handler(req, res) {
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
            return res.status(409).json({ error: 'User already exists with this email.' }); // 409 Conflict might be more appropriate here
        }

        // Encrypt the password before storing it in the database
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword, // Store the hashed password, not the plain one
            },
        });

        // Optionally, mask the user's password or sensitive information before returning the response
        const userResponse = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            anonymous: newUser.anonymous,
        };

        res.status(201).json(userResponse);
    } catch (error) {
        console.error('Failed to create user:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Use a generic error message for the client
    }
}
