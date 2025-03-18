import { getUserByEmail } from "@/lib/db/auth/user";
import { checkIfPasswordIsCorrect } from "@/lib/auth/hash";

import { expect, test } from "vitest";
import { RegisterUser_ACTION } from "@/actions/auth/register";
import { randomUUID } from "crypto";
import { RegistrationValidationSchemaType } from "@/schemas/auth/register";

/**
 * Test the registration of a random user
 */
test("Register Random User", async () => {
  try {
    const randomId = randomUUID().replace("-", "");
    const email = `${randomId}@test.com`;
    const formData: RegistrationValidationSchemaType = {
      email: email,
      password: "Test123!",
      confirmPassword: "Test123!",
      firstName: `Test${randomId.slice(0, 5)}`,
      lastName: `User${randomId.slice(0, 5)}`,
    };

    const newUser = await RegisterUser_ACTION(formData);

    // Check if there was an error
    expect(newUser.error).toBeUndefined();

    // Check if the user was created
    expect(newUser.data?.email).toBe(email);
  } catch (error) {
    console.log("Test error:", error);
    throw error;
  }
});

/**
 * Test the registration of an existing user (should fail)
 */
test("Register Existing User", async () => {
  try {
    const email = "admin@admin.com";
    const formData: RegistrationValidationSchemaType = {
      email: email,
      password: "Admin123!",
      confirmPassword: "Admin123!",
      firstName: "Admin",
      lastName: "User",
    };

    // Check if this user already exists, if not create it
    const existingUser = await getUserByEmail(email);
    if (!existingUser?.id) await RegisterUser_ACTION(formData);

    const newUser = await RegisterUser_ACTION(formData);

    // Check if there was an error
    expect(newUser.error).toBe("User already exists");
  } catch (error) {
    console.log("Test error:", error);
    throw error;
  }
});

/**
 * Check if user password is correct
 */
test("Check User Password", async () => {
  try {
    const email = "admin@admin.com";
    const password = "Admin123!";

    // Get the user by email from db
    const userFromDb = await getUserByEmail(email);
    if (!userFromDb?.id || !userFromDb?.password)
      throw new Error("User not found");

    const isPasswordCorrect = await checkIfPasswordIsCorrect(
      password,
      userFromDb.id,
      userFromDb.password
    );

    // Check if the password is correct
    expect(isPasswordCorrect).toBe(true);
  } catch (error) {
    console.log(error);
  }
});
