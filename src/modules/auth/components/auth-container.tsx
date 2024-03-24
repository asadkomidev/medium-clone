"use client";

import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import { AuthLogo } from "./auth-logo";
import { OAuthButtons } from "./o-auth-buttons";
import { SignInUpSwitcher } from "./sign-in-up-switcher";

type Props = {
  children: React.ReactNode;
  description: string;
  linkLabel: string;
  linkHref: string;
  oAuthButtons?: boolean;
  className?: string;
  setOpen?: (open: boolean) => void;
};

export const AuthContainer = ({
  children,
  description,
  linkLabel,
  linkHref,
  oAuthButtons,
  className,
  setOpen,
}: Props) => {
  return (
    <div className="w-[350px] md:w-[400px]  bg-background rounded-md">
      <CardHeader>
        <AuthLogo description={description} className={className} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {oAuthButtons && (
        <CardFooter>
          <OAuthButtons />
        </CardFooter>
      )}
      <CardFooter>
        <SignInUpSwitcher label={linkLabel} href={linkHref} setOpen={setOpen} />
      </CardFooter>
    </div>
  );
};
