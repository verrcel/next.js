import { NextRequest } from "next/server";

import { Session, type DefaultSession } from "next-auth";

// node_modules/next-auth/src/lib/index.ts
interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

export type ExtendedUser = DefaultSession["user"] & {
  firstName?: string;
  lastName?: string;
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName?: string;
      lastName?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName?: string;
    lastName?: string;
  }
}
