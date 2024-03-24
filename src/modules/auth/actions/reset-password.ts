"use server";

import { sendPasswordResetEmail } from "@/modules/mail/mail";
import { generatePasswordResetToken } from "../lib/get-tokens";
import { getUserByEmail } from "../lib/get-user";
import {
  ResetPasswordInputValues,
  ResetPasswordSchema,
} from "../schemas/reset-password";

export const resetPassword = async (values: ResetPasswordInputValues) => {
  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid emaiL!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent!" };
};
