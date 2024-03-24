"use server";

import { getUser } from "@/modules/auth/lib/get-user";
import { db } from "@/prisma-client";
import { revalidatePath } from "next/cache";

export const createReply = async (
  storyId: string,
  commentId: string,
  content: string
) => {
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }

  try {
    if (!commentId || !storyId || !content) {
      throw new Error("Invalid input");
    }

    const response = await db.comment.create({
      data: {
        userId: user.id!,
        storyId,
        parentCommentId: commentId,
        content: content,
      },
    });

    revalidatePath(`/${storyId}`);
    return response;
  } catch (error) {
    return { error: "Error creating comment" };
  }
};
