"use client";

import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";

import { AuthContainer } from "./auth-container";
import {
  ResetPasswordInputValues,
  ResetPasswordSchema,
} from "../schemas/reset-password";
import { resetPassword } from "../actions/reset-password";

export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetPasswordInputValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ResetPasswordInputValues) => {
    startTransition(() => {
      resetPassword(values).then((data) => {
        if (data?.error) {
          form.reset();
          toast.error(data.error);
        }
        if (data?.success) {
          form.reset();
          toast.success(data.success);
        }
      });
    });
  };

  return (
    <AuthContainer
      description="Forgot your password?"
      linkLabel="Back to sign in"
      linkHref="/auth/signin">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            <Spinner isPending={isPending} label="Send email" />
          </Button>
        </form>
      </Form>
    </AuthContainer>
  );
};
