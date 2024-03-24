"use server";

import { getUser } from "@/modules/auth/lib/get-user";
import { db } from "@/prisma-client";
import { revalidatePath } from "next/cache";

/**
 * @name: getStoriesByAuthor
 * @description: Get all stories by author not including the current story
 * @param {string} authorId
 * @param {string} storyId
 * @returns stories
 */
export const getStoriesByAuthor = async (authorId: string, storyId: string) => {
  try {
    if (!authorId) throw new Error("Author ID is required");
    const stories = await db.story.findMany({
      take: 2,
      where: {
        authorId,
        publish: true,
        NOT: {
          id: storyId,
        },
      },
      include: {
        Clap: true,
        Comments: true,
        Save: true,
        author: true,
      },
    });
    return stories;
  } catch (error) {
    console.error("Error retrieving stories by author:", error);
    throw error;
  }
};

/**
 * @name: getAllStoriesByAuthor
 * @description: Get all stories by author
 * @param {string} authorId
 * @returns stories
 */
export const getAllStoriesByAuthor = async (authorId: string) => {
  try {
    if (!authorId) throw new Error("Author ID is required");
    const stories = await db.story.findMany({
      where: {
        authorId,
        publish: true,
      },
      include: {
        Clap: true,
        Comments: true,
        Save: true,
        author: true,
      },
    });
    return stories;
  } catch (error) {
    console.error("Error retrieving stories by author:", error);
    throw error;
  }
};

/**
 * @name: getAllNotPublishedStoriesByAuthor
 * @description: Get all not published stories by author
 *  @param {string} authorId
 * @returns stories
 */
export const getAllNotPublishedStoriesByAuthor = async (authorId: string) => {
  try {
    if (!authorId) throw new Error("Author ID is required");
    const stories = await db.story.findMany({
      where: {
        authorId,
        publish: false,
      },
      include: {
        Clap: true,
        Comments: true,
        Save: true,
      },
    });
    return stories;
  } catch (error) {
    console.error("Error retrieving stories by author:", error);
    throw error;
  }
};

/**
 * @name: getAuthor
 * @description: Get author by id
 * @param {string} id
 * @returns author
 */
export const getAuthor = async (id: string) => {
  try {
    if (!id) throw new Error("Author ID is required");
    const author = await db.user.findFirst({
      where: {
        id,
      },
    });
    return author;
  } catch (error) {
    console.error("Error retrieving author:", error);
    throw error;
  }
};
