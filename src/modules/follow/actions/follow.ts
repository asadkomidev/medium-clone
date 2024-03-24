"use server";

import { getUser } from "@/modules/auth/lib/get-user";
import { db } from "@/prisma-client";
import { revalidatePath } from "next/cache";

/**
 * @name follow author
 * @description follow author by id
 * @param authorId
 * @returns following author
 */
export const followAuthor = async (authorId: string) => {
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }
  try {
    const following = await db.following.create({
      data: {
        followerId: user.id!,
        followingId: authorId,
      },
    });
    revalidatePath(`/authors/${authorId}`);
    return following;
  } catch (error) {
    // Handle the error here
    console.error(error);
    throw new Error("Failed to follow author");
  }
};

/**
 * @name unfollow author
 * @description unfollow author by id
 * @param authorId
 * @returns success message
 */
export const unfollowAuthor = async (authorId: string) => {
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }
  try {
    const existingFollowing = await db.following.findFirst({
      where: {
        followerId: user.id!,
        followingId: authorId,
      },
    });

    if (existingFollowing) {
      await db.following.delete({
        where: {
          id: existingFollowing.id,
        },
      });
    }

    revalidatePath(`/authors/${authorId}`);
    return { message: "Unfollowed author" };
  } catch (error) {
    // Handle the error here
    console.error(error);
    throw new Error("Failed to unfollow author");
  }
};

/**
 * @name check if following exists
 * @description check if the user is following a specific author
 * @param authorId
 * @returns true if following exists, false otherwise
 */
export const checkFollowingExists = async (authorId: string) => {
  const user = await getUser();
  //   if (!user) {
  //     throw new Error("User not found");
  //   }
  try {
    const existingFollowing = await db.following.findFirst({
      where: {
        followerId: user?.id!,
        followingId: authorId,
      },
    });
    return !!existingFollowing;
  } catch (error) {
    // Handle the error here
    console.error(error);
    throw new Error("Failed to check if following exists");
  }
};

/**
 * @name get number of followers
 * @description get the number of followers for a specific author
 * @param authorId
 * @returns number of followers
 */
export const getNumberOfFollowers = async (authorId: string) => {
  try {
    const followersCount = await db.following.count({
      where: {
        followingId: authorId,
      },
    });
    return followersCount;
  } catch (error) {
    // Handle the error here
    console.error(error);
    throw new Error("Failed to get number of followers");
  }
};
