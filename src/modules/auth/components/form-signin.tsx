"use client";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { AuthContainer } from "./auth-container";
import { SignInInputValues, SignInSchema } from "../schemas/signin";
import { signInUser } from "../actions/signin";
import { useRouter } from "next/navigation";

type Props = {
  setOpen?: (open: boolean) => void;
};

export const SignInForm = ({ setOpen }: Props) => {
  const [value, setValue] = useState("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<SignInInputValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInInputValues) => {
    startTransition(() => {
      const previousUrl = document.referrer;
      signInUser(values, previousUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            toast.error("Account does not exist!");
          }
          if (data?.success) {
            form.reset();
            toast.success("Confirmation email sent!");
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <AuthContainer
      description="Welcome back"
      linkLabel="Don't have an account?"
      linkHref="/auth/signup"
      setOpen={setOpen}
      oAuthButtons>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div
              className={
                showTwoFactor
                  ? "flex text-center items-center justify-center py-6"
                  : ""
              }>
              {showTwoFactor && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center justify-center">
                      <FormLabel>Code</FormLabel>
                      <FormControl>
                        <InputOTP
                          disabled={isPending}
                          maxLength={6}
                          render={({ slots }) => (
                            <InputOTPGroup>
                              {slots.map((slot, index) => (
                                <InputOTPSlot key={index} {...slot} />
                              ))}{" "}
                            </InputOTPGroup>
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Please enter the code sent to your email
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="you@email.com"
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center justify-between py-1">
                        <span className="">Password</span>
                        <Link
                          href="/auth/reset-password"
                          className="text-xs font-light">
                          Forgot password?
                        </Link>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="••••••••"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>

          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? (
              <Spinner isPending={isPending} label="Confirm" />
            ) : (
              <Spinner isPending={isPending} label="Sign in" />
            )}
          </Button>
        </form>
      </Form>
    </AuthContainer>
  );
};
