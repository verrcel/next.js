import * as z from "zod";

/**
 * Registration validation schema
 */
export const registrationValidationSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: z
    .string({ required_error: "Confirm password is required" })
    .min(1, "Confirm password is required")
    .min(8, "Confirm password must be more than 8 characters")
    .max(32, "Confirm password must be less than 32 characters"),
  firstName: z.string({ required_error: "First name is required" }).min(1, {
    message: "First name is required",
  }),
  lastName: z.string({ required_error: "Last name is required" }).min(1, {
    message: "Last name is required",
  }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

/**
 * Type for registration schema
 */
export type RegistrationValidationSchemaType = z.infer<
  typeof registrationValidationSchema
>;
