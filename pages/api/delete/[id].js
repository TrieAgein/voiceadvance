// pages/api/delete/[id].js
import prisma from '../../../utils/prismaClient.js';

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const userId = parseInt(req.query.id);
  
    try {
      const user = await prisma.user.delete({
        where: {
          user_id: userId,
        },
      });
  
      res.status(200).json({ success: true, message: 'User deleted successfully', user });
    } catch (error) {
      if (error.code === 'P2025') {
        res.status(404).json({ success: false, message: 'User not found' });
      } else {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
      }
    }
  }