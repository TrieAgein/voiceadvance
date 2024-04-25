// pages/api/edit-comment/[commentId].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { commentId } = req.query;  // Extract commentId from the query parameters

    if (req.method === 'PUT') {
        const { topic, content, resolved, department, priority, category } = req.body;

        if (!commentId) {
            return res.status(400).json({ message: 'Comment ID is required' });
        }

        try {
            // Update the comment in the database
            const updatedComment = await prisma.comment.update({
                where: {
                    comment_id: parseInt(commentId)  // Ensure the commentId is an integer
                },
                data: {
                    topic,
                    content,
                    resolved,
                    department,
                    priority,
                    category,
                    updatedAt: new Date()  // Update the 'updatedAt' field to current date and time
                }
            });

            // Respond with the updated comment data
            res.status(200).json(updatedComment);
        } catch (error) {
            console.error('Failed to update comment:', error);
            if (error.code === 'P2025') {
                res.status(404).json({ message: 'No comment found with the given ID' });
            } else {
                res.status(500).json({ message: 'Failed to update comment', error: error.message });
            }
        }
    } else {
        // Method Not Allowed
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
