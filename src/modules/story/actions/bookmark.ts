"use server";

import { getUser } from "@/modules/auth/lib/get-user";
import { db } from "@/prisma-client";
import { revalidatePath } from "next/cache";

/**
 * @name: saveBookmark
 * @description: Save a bookmark
 * @param {string} storyId
 * @returns response
 */
export const saveBookmark = async (storyId: string) => {
  const user = await getUser();
  const userId = user?.id;

  if (!userId) throw new Error("No logged user");
  try {
    const savedBookmark = await db.save.findFirst({
      where: {
        storyId,
        userId,
      },
    });

    if (savedBookmark) {
      await db.save.delete({
        where: {
          id: savedBookmark.id,
        },
      });
      return { message: "Bookmark removed" };
    } else {
      const response = await db.save.create({
        data: {
          storyId,
          userId,
        },
      });

      return response;
    }
  } catch (error) {
    console.error("Error saving bookmark", error);
  } finally {
    revalidatePath(`/${storyId}`);
  }
};
/**
 * @name: removeBookmark
 * @description: Remove a bookmark
 * @param {string} storyId
 * @returns response
 */
export const removeBookmark = async (storyId: string) => {
  const user = await getUser();
  const userId = user?.id;

  if (!userId) throw new Error("No logged user");

  try {
    const savedBookmark = await db.save.findFirst({
      where: {
        storyId,
        userId,
      },
    });

    if (savedBookmark) {
      await db.save.delete({
        where: {
          id: savedBookmark.id,
        },
      });

      return { message: "Bookmark removed" };
    }
  } catch (error) {
    console.error("Error removing bookmark", error);
  } finally {
    revalidatePath(`/${storyId}`);
  }
};

/**
 * @name: getBookmarks
 * @description: Get all bookmarks
 * @returns response
 */
export const getBookmarks = async () => {
  const user = await getUser();
  const userId = user?.id;

  if (!userId) throw new Error("No logged user");

  try {
    const bookmarks = await db.save.findMany({
      where: {
        userId,
      },
    });

    return bookmarks;
  } catch (error) {
    console.error("Error getting bookmarks", error);
  }
};

/**
 * @name: getBookmark
 * @description: Get a bookmark
 * @param {string} storyId
 * @returns response
 */
export const getBookmark = async (storyId: string) => {
  const user = await getUser();
  const userId = user?.id;

  //   if (!userId) throw new Error("No logged user");

  try {
    const saved = await db.save.findFirst({
      where: {
        storyId,
        userId,
      },
    });
    revalidatePath(`/${storyId}`);

    return saved ? true : false;
  } catch (error) {
    console.error("Error getting bookmark", error);
  }
};
