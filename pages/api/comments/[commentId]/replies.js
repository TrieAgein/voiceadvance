// pages/api/comments/[commentId]/replies.js
import prisma from '../../../../utils/prismaClient.js';

export default async function handler(req, res) {
    const { commentId } = req.query;  // Extracting commentId from the URL

    try {
        if (req.method === 'GET') {
            // Fetch replies for a specific comment
            const replies = await prisma.comment.findMany({
                where: { parentCommentId: parseInt(commentId) },
                include: {
                    replies: true // assuming you want to fetch nested replies too
                }
            });

            if (replies.length > 0) {
                res.status(200).json(replies);
            } else {
                res.status(404).json({ message: "No replies found for this comment." });
            }
        } else {
            // Handle other methods or return 405 for methods not allowed
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error(`Failed to fetch replies: ${error.message}`);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
}
