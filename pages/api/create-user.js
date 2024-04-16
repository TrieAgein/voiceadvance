import prisma from '../../utils/prismaClient.js';
import bcrypt from 'bcryptjs'; // Ensure you have 'bcryptjs' installed: npm install bcryptjs

export default async function handler(req, res) {
    const { password, name, email } = req.body; // Ensure anonymous defaults to false if not provided

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
            return res.status(409).json({ error: 'User already exists with this email.' }); // 409 Conflict for existing resource
        }

        // Encrypt the password before storing it in the database
        const salt = await bcrypt.genSalt(10); // Generate a salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword // Store the hashed password, not the plain one
            },
        });

        // Prepare user data for response, ensuring to never return sensitive data
        const userResponse = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        };

        res.status(201).json(userResponse);
    } catch (error) {
        console.error('Failed to create user:', error);
        res.status(500).json({ error: 'Internal Server Error' }); // Generic error message for the client
    }
}
