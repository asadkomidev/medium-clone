import { Suspense } from "react";

import { SignInForm } from "../components/form-signin";

export const SignInPage = () => {
  return (
    <Suspense fallback="Loading...">
      <SignInForm />
    </Suspense>
  );
};
