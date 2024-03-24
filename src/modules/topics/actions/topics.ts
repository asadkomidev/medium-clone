"use server";

import { db } from "@/prisma-client";
import { getUser } from "@/modules/auth/lib/get-user";
import { revalidatePath } from "next/cache";

export const createTopic = async (tag: any) => {
  const user = await getUser();
  const userId = user?.id;
  if (!userId) {
    return { error: "User not logged in" };
  }

  try {
    const topic = await db.topics.findFirst({
      where: {
        userId,
      },
    });

    if (!topic) {
      await db.topics.create({
        data: {
          userId,
          selectedTopics: tag,
        },
      });
    } else {
      await db.topics.update({
        where: {
          id: topic.id,
        },
        data: {
          selectedTopics: tag,
        },
      });
    }
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log("Error while adding topics/tags");
    return { error: "Error while adding topics/tags" };
  }
};

/**
 * @name getTopics
 * @description get all topics from stories
 * @returns topics
 */
export const getTopics = async () => {
  try {
    const allStoryTopics = await db.story.findMany({
      select: {
        topics: true,
      },
    });

    const uniqueTopics = Array.from(
      new Set(allStoryTopics.flatMap((item) => item.topics))
    );

    const formattedData = uniqueTopics.map((topic) => ({
      value: topic,
      label: topic,
    }));

    return { data: formattedData };
  } catch (error) {
    return { data: [] };
  }
};

/**
 * @name getStoriesByTag
 * @description get all stories by tag
 * @param tag
 * @returns stories
 */
export const getStoriesByTag = async (tag: string) => {
  try {
    if (tag === "All") {
      const AllStories = await db.story.findMany({
        where: {
          publish: true,
        },
      });
      return { data: AllStories };
    }
    const taggedStories = await db.story.findMany({
      where: {
        topics: {
          has: tag,
        },
        publish: true,
      },
    });

    return { data: taggedStories };
  } catch (error) {
    return { data: [] };
  }
};

/**
 * @name getUserSelectedTopics
 * @description get user selected topics
 * @returns  Tags
 */
export const getUserSelectedTopics = async () => {
  const user = await getUser();
  const UserId = user?.id;
  if (!UserId) throw new Error("User not logged in");

  try {
    const tags = await db.topics.findFirst({
      where: {
        userId: UserId,
      },
      select: {
        selectedTopics: true,
      },
    });

    const formattedData = tags?.selectedTopics.map((topic) => ({
      value: topic,
      label: topic,
    }));
    return { tags: formattedData || [] };
  } catch (error) {
    return { tags: [] };
  }
};
export const getSelectedTopics = async () => {
  const user = await getUser();
  const UserId = user?.id;
  if (!UserId) throw new Error("User not logged in");

  try {
    const tags = await db.topics.findFirst({
      where: {
        userId: UserId,
      },
      select: {
        selectedTopics: true,
      },
    });

    const formattedData = tags?.selectedTopics.map((topic) => ({
      value: topic,
      label: topic,
    }));
    return { tags: formattedData || [] };
  } catch (error) {
    return { tags: [] };
  }
};
