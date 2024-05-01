// pages/api/comments/[commentId].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { commentId } = req.query;  // Extracting commentId from the URL

    if (req.method === 'GET') {
        try {
            const comment = await prisma.comment.findUnique({
                where: { comment_id: parseInt(commentId) },
            });
            if (comment) {
                res.status(200).json(comment);
            } else {
                res.status(404).json({ message: "Comment not found" });
            }
        } catch (error) {
            res.status(500).json({ error: `Failed to retrieve comment: ${error.message}` });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
