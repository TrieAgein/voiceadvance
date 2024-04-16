import prisma from '../../utils/prismaClient.js'; // Ensure prisma client is properly imported

export default async function handler(req, res) {
    // Destructuring the expected fields from the request body
    const { name, topic, content, authorId, resolved = false, parentCommentId, anonymous = false } = req.body;

    // Validate necessary fields for a reply
    if (!authorId || !content || parentCommentId === undefined) {
        return res.status(400).json({ error: "Author ID, content, and parent comment ID are required." });
    }

    try {
        // Check if the parent comment exists
        const parentComment = await prisma.comment.findUnique({
            where: { comment_id: parentCommentId },
        });

        if (!parentComment) {
            return res.status(404).json({ error: "Parent comment not found." });
        }

        // Create a new reply
        const newReply = await prisma.comment.create({
            data: {
                name, // Name could be empty or from the parent comment, depending on logic
                topic, // Topic could follow the parent's topic or be specifically set for the reply
                content,
                upvotes: 0, // Upvotes start at 0 for a new comment
                authorId,
                resolved,
                parentCommentId, // Ensure this is never null here as it's a reply
                anonymous
            },
        });

        // Optionally remove sensitive or unnecessary data from the response
        const responseReply = {
            id: newReply.id,
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
