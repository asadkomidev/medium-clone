"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { SIGNIN_REDIRECT } from "../../../../routes";

export const OAuthButtons = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();

  const onClick = (provider: "google" | "github") => {
    const previousUrl = document.referrer;
    signIn(provider, {
      callbackUrl: previousUrl || SIGNIN_REDIRECT,
    });
    router.back();
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}>
        <FcGoogle className="h-5 w-5 mr-2" />
        <span>Google </span>
      </Button>
      {/* <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button> */}
    </div>
  );
};
