"use client";

import { TriangleAlert } from "lucide-react";

import { AuthContainer } from "./auth-container";

export const AuthErrorCard = () => {
  return (
    <AuthContainer
      description="Oops! Something went wrong!"
      linkHref="/auth/signin"
      linkLabel="Back to sign in"
      className="text-center">
      <div className="w-full flex justify-center items-center bg-destructive/15 rounded-md p-4">
        <TriangleAlert className="text-destructive" />
      </div>
    </AuthContainer>
  );
};
