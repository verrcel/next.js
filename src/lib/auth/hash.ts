import { compare, hash } from "bcryptjs";

/**
 * Hashes a password with the given user ID
 * @param password - The password to hash
 * @param userId - The user ID to hash the password with
 */
export const hashPassword = async (
  password: string,
  userId: string,
): Promise<string> => {
  return await hash(password + userId, 10);
};

/**
 * Checks if the password is correct
 * @param password - The password to check
 * @param userId - The user ID to check the password with
 * @param hash - The hash to compare the password with
 */
export const checkIfPasswordIsCorrect = async (
  password: string,
  userId: string,
  hash: string,
): Promise<boolean> => {
  return await compare(password + userId, hash);
};
