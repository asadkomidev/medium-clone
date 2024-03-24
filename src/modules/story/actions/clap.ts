"use server";

import { getUser } from "@/modules/auth/lib/get-user";
import { db } from "@/prisma-client";
import { revalidatePath } from "next/cache";

/**
 * name: clap
 * description: This function is used to clap a story or a comment.
 * @param storyId
 * @param commentId
 * @returns
 */
export const clap = async (storyId: string, commentId?: string) => {
  const user = await getUser();
  const userId = user?.id;

  if (!userId) throw new Error("No logged user");

  try {
    const story = await db.story.findUnique({
      where: {
        id: storyId,
      },
    });

    if (!story) {
      throw new Error("Story does not exist");
    }

    const clapped = await db.clap.findFirst({
      where: {
        storyId,
        userId,
      },
    });

    if (clapped && clapped.clapCount < 50) {
      await db.clap.update({
        where: {
          id: clapped.id,
        },
        data: {
          clapCount: clapped.clapCount + 1,
        },
      });
      return { message: "Clap updated" };
    } else {
      await db.clap.create({
        data: {
          storyId,
          userId,
          clapCount: 1,
        },
      });
      return { message: "Clap created" };
    }
  } catch (error) {
    return { message: "Error clap to story" };
  } finally {
    revalidatePath(`/story/${storyId}`);
  }
};
/**
 * @name unClap
 * @description This function is used to unclap a story or a comment.
 * @param storyId of type string
 * @param commentId  of type string
 * @returns success message
 */
export const unClap = async (storyId: string, commentId?: string) => {
  const user = await getUser();
  const userId = user?.id;

  if (!userId) throw new Error("No logged user");

  try {
    const story = await db.story.findUnique({
      where: {
        id: storyId,
      },
    });

    if (!story) {
      throw new Error("Story does not exist");
    }

    const clapped = await db.clap.findFirst({
      where: {
        storyId,
        userId,
      },
    });

    if (clapped && clapped.clapCount > 0) {
      await db.clap.update({
        where: {
          id: clapped.id,
        },
        data: {
          clapCount: clapped.clapCount - 1,
        },
      });
      return { message: "Clap updated" };
    } else {
      return { message: "Clap not found" };
    }
  } catch (error) {
    return { message: "Error unclap to story" };
  } finally {
    revalidatePath(`/story/${storyId}`);
  }
};

/**
 * @name clapOnComment
 * @description This function is used to clap on a comment.
 * @param storyId of type string
 * @param commentId  of type string
 * @returns success message
 */
export const clapOnComment = async (storyId: string, commentId?: string) => {
  const user = await getUser();
  const userId = user?.id;

  if (!userId) throw new Error("No logged user");

  try {
    const story = await db.story.findUnique({
      where: {
        id: storyId,
      },
    });

    if (!story) {
      throw new Error("Story does not exist");
    }

    const clapped = await db.clap.findFirst({
      where: {
        storyId,
        userId,
        commentId,
      },
    });

    if (clapped && clapped.clapCount < 50) {
      await db.clap.update({
        where: {
          id: clapped.id,
        },
        data: {
          clapCount: clapped.clapCount + 1,
        },
      });
      return { message: "Clap updated" };
    } else {
      await db.clap.create({
        data: {
          storyId,
          userId,
          commentId,
          clapCount: 1,
        },
      });
      return { message: "Clap created" };
    }
  } catch (error) {
    return { message: "Error clap to story" };
  } finally {
    revalidatePath(`/story/${storyId}`);
  }
};
/**
 * @name unClapOnComment
 * @description This function is used to unclap on a comment.
 * @param storyId of type string
 * @param commentId  of type string
 * @returns success message
 */

export const unClapOnComment = async (storyId: string, commentId?: string) => {
  const user = await getUser();
  const userId = user?.id;

  if (!userId) throw new Error("No logged user");

  try {
    const story = await db.story.findUnique({
      where: {
        id: storyId,
      },
    });

    if (!story) {
      throw new Error("Story does not exist");
    }

    const clapped = await db.clap.findFirst({
      where: {
        storyId,
        userId,
        commentId,
      },
    });

    if (clapped && clapped.clapCount > 0) {
      await db.clap.update({
        where: {
          id: clapped.id,
        },
        data: {
          clapCount: clapped.clapCount - 1,
        },
      });
      return { message: "Clap updated" };
    } else {
      return { message: "Clap not found" };
    }
  } catch (error) {
    return { message: "Error unclap to story" };
  } finally {
    revalidatePath(`/story/${storyId}`);
  }
};

/**
 * name: clapCount
 * description: This function is used to get the total number of claps for a story or a comment.
 * @param storyId
 * @param commentId
 * @returns
 */
export const clapCount = async (storyId: string, commentId?: string) => {
  try {
    if (!commentId) {
      const Clap = await db.clap.aggregate({
        where: {
          storyId,
          commentId: null,
        },
        _sum: {
          clapCount: true,
        },
      });

      return Clap._sum?.clapCount || 0;
    }

    const Clap = await db.clap.aggregate({
      where: {
        storyId,
        commentId,
      },
      _sum: {
        clapCount: true,
      },
    });

    return Clap._sum?.clapCount || 0;
  } catch (error) {
    return 0;
  }
};

/**
 * name: clapCountByUser
 * description: This function is used to get the total number of claps for a story or a comment by a user.
 * @param storyId
 * @param commentId
 * @returns
 */
export const clapCountByUser = async (storyId: string, commentId?: string) => {
  const user = await getUser();
  const userId = user?.id;

  // if (!userId) throw new Error("No logged user");

  try {
    if (!commentId) {
      const Clap = await db.clap.aggregate({
        where: {
          storyId,
          userId,
          commentId: null,
        },
        _sum: {
          clapCount: true,
        },
      });

      return JSON.parse(JSON.stringify(Clap._sum?.clapCount || 0));
    }

    const Clap = await db.clap.aggregate({
      where: {
        storyId,
        userId,
        commentId,
      },
      _sum: {
        clapCount: true,
      },
    });

    return JSON.parse(JSON.stringify(Clap._sum?.clapCount || 0));
  } catch (error) {
    return 0;
  }
};
