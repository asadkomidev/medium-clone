import { User } from "./type-user";

export type Session = {
  _id: string;
  sessionToken: string;
  userId: string;
  expires: string;
  user: User;
};
