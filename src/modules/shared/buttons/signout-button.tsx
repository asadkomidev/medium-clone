"use client";

import { signOutUser } from "../../auth/actions/sign-out";

type Props = {
  children?: React.ReactNode;
};

export const SignOutButton = ({ children }: Props) => {
  const signOut = () => {
    signOutUser();
  };

  return (
    <span onClick={signOut} className="cursor-pointer">
      {children}
    </span>
  );
};
