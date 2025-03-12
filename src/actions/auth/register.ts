"use server";

import { createUser } from "@/lib/db/auth/register";
import { getUserByEmail } from "@/lib/db/auth/user";
import {
  registrationValidationSchema,
  RegistrationValidationSchemaType,
} from "@/schemas/auth/register";
import { ActionReturnType } from "@/types";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

export const RegisterUser_ACTION = async (
  values: RegistrationValidationSchemaType
): Promise<ActionReturnType<User>> => {
  try {
    // Validate form values, if invalid return an error
    const validatedFormValues = registrationValidationSchema.safeParse(values);
    if (!validatedFormValues.success)
      return {
        error: "Invalid form values",
      };

    const { email, password, firstName, lastName } = validatedFormValues.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) return { error: "User already exists" };

    const userId = crypto.randomUUID();

    // Hash the password with the user ID
    const hashedPassword = await hash(password + userId, 10);

    const newUser = await createUser({
      userId: userId,
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
    });

    return {
      message: "Registration was successful, please login to continue",
      data: newUser,
    };
  } catch (error) {
    console.error("Register_ACTION error", error);

    return {
      error: "Internal server error",
    };
  }
};
