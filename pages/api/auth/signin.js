// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '../../../utils/prismaClient.js';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "username@company.com" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          // Correct password, return user for session creation
          return { id: user.id, name: user.name, email: user.email, role: user.role };
        } else {
          // Incorrect credentials
          return null;
        }
      },
    }),
  ],
  // Additional configuration for session handling and security
  session: {
    strategy: 'jwt', // or 'database' if you prefer persistent sessions
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // If user was just signed in, add their ID to the token
      if (user) token.id = user.id;
      return token;
    },
    session: async ({ session, token }) => {
      // Pass the user ID to the session object
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.SECRET, // Define a secret for signing the session token
});
