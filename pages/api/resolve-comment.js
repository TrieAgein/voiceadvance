import prisma from '../../utils/prismaClient.js';

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        // Restrict this API to only handle POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
        return;
    }
	const comment_id = req.query.comment_id;

    // Basic input validation
    if (!content || !authorId) {
        res.status(400).json({ error: "Required fields 'content' and 'authorId' are missing." });
        return;
    }

    try {
        const newComment = await prisma.comment.create({
            data: {
                name, // This can be empty if not provided
                topic, // This can be empty if not provided
                content,
                upvotes: 0,
                authorId,
                resolved,
                parentCommentId, // This can be null if it's a top-level comment
                anonymous,
				department,
				priority,
				category
            },
        });
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Failed to create comment:', error);
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
}
