import { prisma } from "../prisma";

/**
 * DB function to create a user.
 * @param userId - The ID of the user.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @param firstName - The first name of the user.
 * @param lastName - The last name of the user.
 * @returns The created user.
 */
export async function createUser({
  userId,
  email,
  password,
  firstName,
  lastName,
}: {
  userId: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  return await prisma.user.create({
    data: {
      id: userId,
      email,
      password,
      firstName,
      lastName,
    },
  });
}
