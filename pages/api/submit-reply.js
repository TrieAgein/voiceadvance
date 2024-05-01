import prisma from '../../utils/prismaClient.js';

export default async function handler(req, res) {
    const { content, authorId, parentCommentId, anonymous = false } = req.body;

    // Validate necessary fields for a reply
    if (!authorId || !content || parentCommentId === null) {
        return res.status(400).json({ error: "Author ID, content, and parent comment ID are required." });
    }

    try {
        // Check if the parent comment exists and fetch necessary details
        const parentComment = await prisma.comment.findUnique({
            where: { comment_id: parentCommentId },
            select: { name: true, topic: true } // Select only needed fields
        });

        if (!parentComment) {
            return res.status(404).json({ error: "Parent comment not found." });
        }

        // Create a new reply, inheriting the parent's name and topic if not provided in the request
        const newReply = await prisma.comment.create({
            data: {
                name: req.body.name || parentComment.name,
                topic: req.body.topic || parentComment.topic,
                content,
                upvotes: 0, // Upvotes start at 0 for a new comment
                authorId,
                resolved: false, // Replies typically start as not resolved
                parentCommentId,
                anonymous,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        });

        // Return only the necessary fields to the client
        const responseReply = {
            id: newReply.comment_id,
            name: newReply.name,
            topic: newReply.topic,
            content: newReply.content,
            upvotes: newReply.upvotes,
            resolved: newReply.resolved,
            parentCommentId: newReply.parentCommentId,
            anonymous: newReply.anonymous,
        };

        res.status(201).json(responseReply);
    } catch (error) {
        console.error('Failed to create reply:', error);
        res.status(500).json({ error: `An error occurred: ${error.message}` });
    }
}
