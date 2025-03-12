import { getUserByEmail } from "../db/auth/user";
import { checkIfPasswordIsCorrect } from "./hash";
import { signInSchema } from "@/schemas/auth/login";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = signInSchema.safeParse(credentials);

        // If the fields are invalid, return null
        if (!validatedFields.success) throw new Error("Invalid fields");

        const user = await getUserByEmail(validatedFields.data.email);

        // If the user doesn't exist or doesn't have a password, return null
        if (!user || !user.password)
          throw new Error("User does not exist on the database");

        const isPasswordCorrect = await checkIfPasswordIsCorrect(
          validatedFields.data.password,
          user.id,
          user.password,
        );

        // If the passwords don't match, throw an error for debugging purposes
        if (!isPasswordCorrect) throw new Error("Invalid credentials");

        // Return the user
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
