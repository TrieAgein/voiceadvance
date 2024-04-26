// pages/api/upvotes/[commentId].js

import prisma from '../../../utils/prismaClient.js';

export default async function handler(req, res) {
  const { commentId } = req.query;

  if (req.method === 'PUT') {
    // Ensure the upvotes count is provided and it is a number
    if (req.body.upvotes === undefined || typeof req.body.upvotes !== 'number') {
      res.status(400).json({ error: "Invalid request: 'upvotes' must be a number." });
      return;
    }

    try {
      const comment = await prisma.comment.update({
        where: { comment_id: parseInt(commentId) },
        data: { upvotes: req.body.upvotes }
      });
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: `Could not update the comment's upvotes: ${error.message}` });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

