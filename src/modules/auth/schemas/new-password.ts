import { z } from "zod";

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export type NewPasswordInputValues = z.infer<typeof NewPasswordSchema>;
