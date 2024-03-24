"use client";

import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  NewPasswordInputValues,
  NewPasswordSchema,
} from "../schemas/new-password";
import { newPassword } from "../actions/new-password";

export const NewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewPasswordInputValues>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: NewPasswordInputValues) => {
    startTransition(() => {
      newPassword(values, token).then((data) => {
        if (data?.error) {
          form.reset();
          toast.error(data.error);
        }
        if (data?.success) {
          form.reset();
          toast.success(data.success);
          router.push("/auth/signin");
        }
      });
    });
  };

  return (
    <AuthContainer
      description="Enter a new password"
      linkLabel="Back to sign in"
      linkHref="/auth/signin">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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
          </div>

          <Button disabled={isPending} type="submit" className="w-full">
            <Spinner isPending={isPending} label="Reset password" />
          </Button>
        </form>
      </Form>
    </AuthContainer>
  );
};
