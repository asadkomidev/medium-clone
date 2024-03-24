import { Suspense } from "react";
import { ResetPasswordForm } from "../components/form-reset-password";

export const ResetPasswordPage = () => {
  return (
    <Suspense fallback="Loading...">
      <ResetPasswordForm />
    </Suspense>
  );
};
