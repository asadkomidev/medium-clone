"use server";

import { getUser } from "@/modules/auth/lib/get-user";
import { db } from "@/prisma-client";
import { revalidatePath } from "next/cache";

/**
 * @name getAllBookmarks
 * @description get all bookmarks saved by user
 * @returns bookmarks
 *
 */
export const getAllBookmarks = async () => {
  const user = await getUser();
  if (!user) {
    return { response: [] };
  }
  try {
    const bookmarks = await db.story.findMany({
      where: {
        publish: true,
        Save: {
          some: {
            userId: user.id,
          },
        },
      },
    });
    return bookmarks;
  } catch (error) {
    // Handle the error here
    console.error(error);
    throw new Error("Failed to get bookmarks");
  }
};

/**
 * @name getBookmarkStory
 * @description get bookmark story by id
 * @param id
 * @returns story
 */
export const getBookmarkStory = async (id: string) => {
  try {
    const story = await db.story.findUnique({
      where: {
        id,
      },
    });
    return story;
  } catch (error) {
    // Handle the error here
    console.error(error);
    throw new Error("Failed to get bookmark story");
  }
};
