import { User } from "./type-user";

export type TwoFactorConfirmation = {
  _id: string;
  userId: string;
  user: User;
};
