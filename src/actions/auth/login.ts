"use server";

import { ActionReturnType } from "@/types";

import { signIn } from "@/auth";
import { signInSchema, SignInSchemaType } from "@/schemas/auth/login";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { getUserByEmail } from "@/lib/db/auth/user";
import { checkIfPasswordIsCorrect } from "@/lib/auth/hash";

export const Login_ACTION = async (
  values: SignInSchemaType,
): Promise<ActionReturnType<undefined>> => {
  try {
    // Validate form values, if invalid return an error
    const validatedFormValues = signInSchema.safeParse(values);
    if (!validatedFormValues.success)
      return {
        error: "Invalid form values",
      };

    const { email, password } = validatedFormValues.data;

    const userFromDb = await getUserByEmail(email);
    if (!userFromDb || !userFromDb.id || !userFromDb.password) return { error: "User not found" };

    const isValidPassword = await checkIfPasswordIsCorrect(
      password,
      userFromDb.id,
      userFromDb.password,
    );

    if (!isValidPassword) return { error: "Invalid credentials" };

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      message: "Login successful",
    };
  } catch (error) {
    console.error("Login_ACTION error", error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    return {
      error: "Internal server error",
    };
  }
};
