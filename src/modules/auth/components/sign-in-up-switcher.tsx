"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type Props = {
  href: string;
  label: string;
  setOpen?: (open: boolean) => void;
};

export const SignInUpSwitcher = ({ href, label, setOpen }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(href);
        setOpen && setOpen(false);
      }}
      variant="link"
      className="font-normal w-full"
      size="sm"
      asChild>
      <div>
        <span className="mr-1">{label}</span>
        <>
          {pathname === "/auth/signin" && (
            <span className="font-semibold">Sign up</span>
          )}
          {pathname === "/auth/signup" && (
            <span className="font-semibold">Sign in</span>
          )}
        </>
      </div>
    </Button>
  );
};
