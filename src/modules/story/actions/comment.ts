"use server";

import { getUser } from "@/modules/auth/lib/get-user";
import { db } from "@/prisma-client";
import { revalidatePath } from "next/cache";

/**
 * @name: createComment
 * @description: This function is used to create a comment on a story.
 * @param storyId
 * @param content
 * @returns success message
 */
export const createComment = async (storyId: string, content: string) => {
  const user = await getUser();
  const userId = user?.id;

  if (!userId) throw new Error("No logged user");

  try {
    if (!storyId || !content) throw new Error("Invalid input");
    await db.comment.create({
      data: {
        content,
        storyId,
        userId,
      },
    });
    return { message: "Comment created" };
  } catch (error) {
    return { message: "Error creating comment" };
  } finally {
    revalidatePath(`/${storyId}`);
  }
};

/**
 * @name: getComments
 * @description: This function is used to get comments from a story.
 * @param storyId
 * @returns parentCommentId - optional
 * @returns comments
 */
export const getComments = async (
  storyId: string,
  parentCommentId?: string
) => {
  const user = await getUser();
  const userId = user?.id;

  try {
    if (!parentCommentId) {
      const comments = await db.comment.findMany({
        where: {
          storyId,
          parentCommentId: null,
        },
        include: {
          user: true,
          Clap: true,
          replies: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return comments;
    } else {
      const comments = await db.comment.findMany({
        where: {
          storyId,
          parentCommentId,
        },
        include: {
          user: true,
          Clap: true,
          replies: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return comments;
    }
  } catch (error) {
    return { message: "Error getting comments" };
  } finally {
    revalidatePath(`/${storyId}`);
  }
};

/**
 * @name: commentCount
 * @description: This function is used to get the total number of comments for a story or a comment.
 * @param storyId of type string
 * @returns number
 */
export const commentCount = async (storyId: string) => {
  try {
    const commentCount = await db.comment.aggregate({
      where: {
        storyId,
      },
      _count: true,
    });
    return commentCount._count || 0;
  } catch (error) {
    return 0;
  }
};

/**
 * @name: deleteComment
 * @description: This function is used to delete a comment.
 * @param commentId
 * @returns success message
 */
export const deleteComment = async (commentId: string) => {
  const user = await getUser();
  const userId = user?.id;

  try {
    if (!userId) throw new Error("No logged user");
    await db.comment.delete({
      where: {
        id: commentId,
        userId,
      },
    });
    revalidatePath(`/*`);
    return { message: "Comment deleted" };
  } catch (error) {
    return { message: "Error deleting comment" };
  }
};
