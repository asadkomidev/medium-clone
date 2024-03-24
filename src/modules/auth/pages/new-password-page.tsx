import { Suspense } from "react";
import { NewPasswordForm } from "../components/form-new-password";

export const NewPasswordPage = () => {
  return (
    <Suspense fallback="Loading...">
      <NewPasswordForm />
    </Suspense>
  );
};
