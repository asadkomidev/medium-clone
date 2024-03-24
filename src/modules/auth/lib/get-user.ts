import { auth } from "../../../../auth";
import { db } from "../../../../prisma/prisma-client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const getUser = async () => {
  const session = await auth();

  return session?.user;
};

export const getRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
