import prisma from "../../utils/prismaClient.js";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    // Restrict this API to only handle POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
    return;
  }
  const comment_id = parseInt(req.body);
  try {
    const comment = await prisma.comment.update({
      where: { comment_id },
      data: { resolved: true },
    });
    res.status(201).json(comment);
  } catch (error) {
    console.error("Failed to create comment:", error);
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
}
