import { Suspense } from "react";
import { SignUpForm } from "../components/form-signup";

export const SignUpPage = () => {
  return (
    <Suspense fallback="Loading...">
      <SignUpForm />
    </Suspense>
  );
};
