import { z } from "zod";

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export type ResetPasswordInputValues = z.infer<typeof ResetPasswordSchema>;
