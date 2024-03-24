"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "../../../../prisma/prisma-client";
import { SignUpInputValues, SignUpSchema } from "../schemas/signup";
import { getUserByEmail } from "../lib/get-user";
import { generateVerificationToken } from "../lib/get-tokens";
import { sendVerificationEmail } from "@/modules/mail/mail";

export const signUpUser = async (values: SignUpInputValues) => {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
    name || ""
  );

  return { success: "Confirmation email sent!" };
};
