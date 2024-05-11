import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../utils/prismaClient.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "username@company.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;
        try {
          const cipher = crypto.createCipheriv(
            "aes-256-cbc",
            process.env.SECRET_KEY,
            process.env.IV,
          );
          let encryptedEmail = cipher.update(credentials.email, "utf8", "hex");
          encryptedEmail += cipher.final("hex");

          const user = await prisma.user.findUnique({
            where: { email: encryptedEmail },
          });

          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            // Return safe user object including role
            return {
              id: user.user_id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
          return null;
        } catch (error) {
          console.error("Failed to authenticate:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // Include both id and role in the JWT
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // Extract the role and user_id and attach them to the session object
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.SECRET_KEY,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
});
