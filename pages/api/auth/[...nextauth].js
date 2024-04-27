import crypto from 'crypto';
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '../../../utils/prismaClient.js';
import bcrypt from 'bcryptjs';  // Ensure bcryptjs is installed for password hashing

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "username@company.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        try {
			const cipher = crypto.createCipheriv('aes-256-cbc', process.env.SECRET_KEY, process.env.IV);
			let encryptedEmail = cipher.update(credentials.email, 'utf8', 'hex');
			encryptedEmail += cipher.final('hex');
			
          // Fetch the user from the database by email
          const user = await prisma.user.findUnique({
            where: {
              email: encryptedEmail
            }
          });

          // Check if user exists and the password matches
          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            // Return safe user object
            return {
              id: user.id,
              name: user.name,
              email: user.email
            };
          }

          // If user not found or password does not match
          return null;
        } catch (error) {
          // Log or handle errors appropriately
          console.error('Failed to authenticate:', error);
          return null;
        }
      }
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // If user was just signed in, add id to the token
      if (user) token.id = user.id;
      return token;
    },
    session: async ({ session, token }) => {
      // Pass the id and email to the session
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',  // Custom sign-in page if needed
    error: '/auth/error',    // Error handling page
  },
  secret: process.env.SECRET_KEY,  // A secret used for key generation
  session: {
    strategy: "jwt",  // Using JWT for session strategy
  },
  debug: process.env.NODE_ENV === 'development',  // Enable debug mode in development
});
