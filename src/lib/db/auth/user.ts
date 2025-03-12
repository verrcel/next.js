import { prisma } from "../prisma";

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

/**
 * Get user by id
 * @param id - User id
 */
export const getUserById = async (id: string) =>
  await prisma.user.findUnique({
    where: { id },
  });

/**
 * Get account by user id
 * @param userId - User id
 * @returns Account
 */
export const getAccountByUserId = async (userId: string) =>
  await prisma.account.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

/**
 * Type for the get account by user id return type
 */
export type GetAccountByUserIdType = Awaited<
  ReturnType<typeof getAccountByUserId>
>;
