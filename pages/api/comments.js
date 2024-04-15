import prisma from '../../utils/prismaClient.js';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        // Only GET method is allowed
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    try {
        // Fetch the comments along with conditional includes based on the anonymous flag
        const comments = await fetchComments();

        // Sending back the transformed response
        res.status(200).json(comments);
    } catch (error) {
        console.error('Failed to fetch comments:', error);
        res.status(500).json({ error: `Server error: ${error.message}` });
    }
}

async function fetchComments() {
    const comments = await prisma.comment.findMany({
        where: { parentCommentId: null },
        include: {
            replies: true, // Include immediate replies to these comments
            author: {
                select: {
                    name: true, // Select only the name to show
                    email: false // Assuming we handle the visibility of email elsewhere or not needed
                }
            }
        }
    });

    // Transform the comments to handle the anonymity
    return comments.map(comment => {
        if (comment.anonymous && comment.author) {
            // Overriding author info if anonymous
            comment.author.name = "Anonymous";
        }
        return comment;
    });
}
