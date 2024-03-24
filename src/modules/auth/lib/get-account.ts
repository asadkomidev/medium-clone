import { db } from "../../../../prisma/prisma-client";

export const getAccountById = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    });

    return account;
  } catch {
    return null;
  }
};
