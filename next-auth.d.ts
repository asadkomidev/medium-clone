import NextAuth, { type DefaultSession } from "next-auth";
import { RoleAccess } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  role: RoleAccess;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
