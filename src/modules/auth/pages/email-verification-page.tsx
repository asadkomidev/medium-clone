import { Suspense } from "react";
import { EmailVerificationForm } from "../components/form-email-verification";

export const EmailVerificationPage = () => {
  return (
    <Suspense fallback="Loading...">
      <EmailVerificationForm />
    </Suspense>
  );
};
