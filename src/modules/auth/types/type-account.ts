import { User } from "./type-user";

export type Account = {
  _id: string;
  _ref?: string;
  _type?: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refreshToken: string;
  accessToken: string;
  expiresAt: number;
  tokenType: string;
  scope: string;
  idToken: string;
  sessionState: string;
  user: User;
};
