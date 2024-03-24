"use server";

import { db } from "@/prisma-client";
import { getUser } from "@/modules/auth/lib/get-user";
import { revalidatePath } from "next/cache";

/**
 * name: createStory
 * description: Create a new story
 * @returns response
 */
export const createStory = async () => {
  const user = await getUser();

  if (!user) {
    throw new Error("No user is signed in");
  }

  try {
    const response = await db.story.create({
      data: {
        authorId: user.id!,
      },
    });
    revalidatePath("/my-stories");
    return response;
  } catch (error) {
    console.error(error);
  }
};

/**
 *name: updateStory
 *description: Update a story content by id
 * @param id required
 * @param content  required
 * @returns response
 */
export const updateStory = async (id: string, content: string) => {
  const user = await getUser();

  if (!user) {
    throw new Error("No user is signed in");
  }

  if (!id || !content) {
    throw new Error("Missing fields");
  }

  try {
    const response = await db.story.update({
      where: { id },
      data: {
        content,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

/**
 * name: getStory
 * description: Get a story by id
 * @param id required
 * @returns response
 */
export const getStory = async (id: string) => {
  if (!id) {
    throw new Error("Id is required to get story");
  }

  try {
    const response = await db.story.findUnique({
      where: { id },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @name getAllPublishedStories
 * @description get all published stories
 * @returns stories
 *
 */
export const getAllPublishedStories = async () => {
  try {
    const response = await db.story.findMany({
      where: {
        publish: true,
      },
      include: {
        author: true,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getTopPicksStories = async () => {
  try {
    const response = await db.story.findMany({
      take: 3,
      where: {
        publish: true,
      },
      include: {
        author: true,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
export const getTopPicksStoriesMain = async () => {
  try {
    const response = await db.story.findMany({
      take: 6,
      where: {
        publish: true,
      },
      include: {
        author: true,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

/**
 * name: getPublishedStory
 * description: Get a published story by id
 * @param id required
 * @returns response
 */
export const getPublishedStory = async (id: string) => {
  if (!id) {
    throw new Error("Id is required to get published story");
  }

  try {
    const response = await db.story.findUnique({
      where: {
        id,
        publish: true,
      },
      include: {
        author: true,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

/**
 * name: getStories
 * description: Get all stories
 * @returns response
 */
export const getStories = async () => {
  try {
    const response = await db.story.findMany();
    return response;
  } catch (error) {
    console.error(error);
  }
};
/**
 * name: getMyStories
 * description: Get all stories by user
 * @returns response
 *
 */
export const getMyPublishedStories = async () => {
  const user = await getUser();
  if (!user) {
    throw new Error("No user is signed in");
  }

  try {
    const response = await db.story.findMany({
      where: {
        authorId: user.id!,
        publish: true,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
/**
 * name: getMyStories
 * description: Get all stories by user
 * @returns response
 *
 */
export const getMyDraftsStories = async () => {
  const user = await getUser();
  if (!user) {
    throw new Error("No user is signed in");
  }

  try {
    const response = await db.story.findMany({
      where: {
        authorId: user.id!,
        publish: false,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

/**
 * name: publishStory
 * description: Publish a story by id and topics
 * @param id required
 * @param topics required
 * @returns response
 */

export const publishStory = async (id: string, topics: string[]) => {
  const user = await getUser();
  if (!user) {
    throw new Error("No user is signed in");
  }
  if (!id || !topics) {
    throw new Error("Id and topics are required to publish story");
  }

  try {
    const response = await db.story.update({
      where: { id },
      data: {
        publish: true,
        topics: {
          set: topics,
        },
      },
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

/**
 * name: unpublishStory
 * description: Unpublish a story by id
 * @param id required
 * @param publish required
 * @returns response
 */
export const unpublishStory = async (id: string, publish: boolean) => {
  if (!id) {
    throw new Error("Id is required to unpublish story");
  }

  try {
    const response = await db.story.update({
      where: { id },
      data: {
        publish: !publish,
      },
    });

    revalidatePath("/my-stories");
    return response;
  } catch (error) {
    console.error(error);
  }
};

/**
 * name: deleteStory
 * description: Delete a story by id
 * @param id required
 * @returns response
 */
export const deleteStory = async (id: string) => {
  if (!id) {
    throw new Error("Id is required to delete story");
  }

  try {
    const response = await db.story.delete({
      where: { id },
    });

    revalidatePath("/my-stories");
    return response;
  } catch (error) {
    console.error(error);
  }
};
/**
 * name: getStoryWithDetails
 * description: Get a story with all comments, claps, and replies by id
 * @param id required
 * @returns response
 */
export const getStoryWithDetails = async (id: string) => {
  if (!id) {
    throw new Error("Id is required to get story");
  }
  try {
    const response = await db.story.findUnique({
      where: { id },
      include: {
        Comments: {
          include: {
            replies: true,
          },
        },
        Clap: true,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
