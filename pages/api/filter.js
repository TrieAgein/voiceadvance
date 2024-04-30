import prisma from '../../utils/prismaClient.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
	const input = req.query.filter;
	
	if(!input) {
		return res.status(400).json({ message: 'Please enter a term to filter by.' });
	}

    try {
		let comments;
		if(input === "true") {
			comments = await prisma.comment.findMany({
				where: {
					resolved: true,
					parentCommentId: null
				}
			})
		}
		else if(input === "false") {
			comments = await prisma.comment.findMany({
				where: {
					resolved: false,
					parentCommentId: null
				},
			})
		}
		else {
			comments = await prisma.comment.findMany({
				where: {
					OR: [{department: input}, {priority: input}, {category: input}]
				},
			})
		}
		
		if (!comments) {
			return res.status(404).json({ message: 'No comments matching the search were found.' });
		}
					
		// If everything is okay, send a success response
		res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong.', error: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
