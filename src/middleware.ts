import { NextRequest } from "next/server";

import authConfig from "@/lib/auth/auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/lib/routes";

import { NextAuthRequest } from "./types/next-auth";
import NextAuth, { Session } from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth(
  // (req: NextRequest & { auth: Session | null }): Response | void => {
  (req: NextAuthRequest) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    // If the route is an API auth route, we don't want to redirect
    if (isApiAuthRoute) return;

    // If the route is a public route, we don't want to redirect
    if (isAuthRoute) {
      // If the route is an auth route and the user is logged in, redirect to the default login redirect
      if (isLoggedIn)
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));

      return;
    }

    // If the user is not logged in and the route is not public, redirect to the login page
    if (!isLoggedIn && !isPublicRoute) {
      // Prevent redirection loop if already on the login page.
      if (nextUrl.pathname === "/auth/login") return;

      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) callbackUrl += nextUrl.search;
      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return Response.redirect(
        new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
        301
      );
    }

    return;
  }
);

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
