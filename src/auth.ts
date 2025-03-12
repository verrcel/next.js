import { prisma } from "@/lib/db/prisma";
import authConfig from "@/lib/auth/auth.config";

import { getUserById } from "./lib/db/auth/user";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      return token;
    },
    async signIn({ user, account }) {
      const existingUser = await getUserById(user.id!);

      // Prevent sign in if user is not found
      if (!existingUser) return false;

      return true;
    },
    async session({ session }) {
      return session;
    },
  },
  ...authConfig,
});
