import prisma from "../../utils/prismaClient.js";

export default async function handler(req, res) {
  const { comment_id, tempUpvotedBy } = req.body;

  if (req.method === "PUT") {
    try {
      const comment = await prisma.comment.update({
        where: { comment_id },
        data: { upvotedBy: tempUpvotedBy },
      });
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({
        error: `Could not update the user's upvotes: ${error.message}`,
      });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
