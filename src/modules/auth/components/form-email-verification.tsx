"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";

// import { FormError } from "@/components/form-error";
// import { FormSuccess } from "@/components/form-success";
// import { verifyEmail } from "../actions/verify-email";
import { AuthContainer } from "./auth-container";
import { verifyEmail } from "../actions/verify-email";

export const EmailVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const router = useRouter();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    verifyEmail(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
        router.push("/auth/signin");
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <AuthContainer
      description="Confirming your verification"
      linkLabel="Back to sign in"
      linkHref="/auth/signin"
      className="text-center">
      <div className="flex items-center w-full justify-center">
        {!success && !error && (
          <div className="w-full text-center p-2 rounded-md">
            <BeatLoader />
          </div>
        )}
        {/* <FormSuccess message={success} />
        {!success && <FormError message={error} />} */}
      </div>
    </AuthContainer>
  );
};
