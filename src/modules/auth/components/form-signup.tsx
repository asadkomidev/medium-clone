"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
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
import { signUpUser } from "../actions/signup";
import { SignUpInputValues, SignUpSchema } from "../schemas/signup";

export const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpInputValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: SignUpInputValues) => {
    startTransition(() => {
      signUpUser(values).then((data) => {
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
      description="Create an account"
      linkLabel="Already have an account?"
      linkHref="/auth/signin"
      oAuthButtons>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Spinner isPending={isPending} label="Create an account" />
          </Button>
        </form>
      </Form>
    </AuthContainer>
  );
};
