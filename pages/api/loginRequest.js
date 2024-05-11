import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Extract email and password from request body
    const { email, password } = req.body;

    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      process.env.SECRET_KEY,
      process.env.IV,
    );
    let encryptedEmail = cipher.update(email, "utf8", "base64");
    encryptedEmail += cipher.final("base64");

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    try {
      // Find the user by email
      const user = await prisma.user.findUnique({
        where: {
          email: encryptedEmail,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid password." });
      }

      // If everything is okay, send a success response
      res
        .status(200)
        .json({
          message: "Login successful!",
          userId: user.user_id,
          name: user.name,
          email: user.email,
        });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong.", error: error.message });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
