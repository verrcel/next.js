import * as z from "zod";

/**
 * Sign in validation schema
 */
export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
});

/**
 * Type for sign in schema
 */
export type SignInSchemaType = z.infer<typeof signInSchema>;
