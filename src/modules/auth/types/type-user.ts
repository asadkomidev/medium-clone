import { Account } from "./type-account";
import { Session } from "./type-session";
import { TwoFactorConfirmation } from "./type-two-factor-confirmation";

export type User = {
  _id: string;
  name: string;
  email: string;
  emailVerified: string;
  image: string;
  password: string;
  role: string;
  accounts: Account[];
  isTwoFactorEnabled: boolean;
  twoFactorConfirmation: TwoFactorConfirmation;
  sessions: Session[];
};
