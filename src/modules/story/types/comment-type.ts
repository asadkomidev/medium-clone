import { Clap, Comment, User } from "@prisma/client";

export type commentsType = {
  user: User;
  Clap: Clap[] | null;
  replies: Comment[] | null;
  id: string;
  content: string;
  userId: string;
  storyId: string;
  parentCommentId: string | null;
  // parentComment: Comment | null;
  createdAt: Date;
  updatedAt: Date;
};
