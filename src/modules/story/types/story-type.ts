import { Clap, Comment, Save, Story, User } from "@prisma/client";

export type StoryType = {
  id: string;
  authorId: string;
  content: string | null;
  topics: string[];
  publish: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: User;
};

export interface StoryWithDetails {
  id: string;
  topics: string[];
  publish: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  content: string;
  author: User;
  comments: CommentType[];
  claps: Clap[];
  save: Save[];
}

export type CommentType = {
  id: string;
  content: string;
  userId: string;
  user: User;
  storyId: string;
  story: Story;
  parentCommentId: string | null;
  parentComment: Comment | null;
  replies: Comment[];
  claps: Clap[];
  createdAt: Date;
  updatedAt: Date;
};

export interface CommentWithDetails extends CommentType {
  user: User;
  story: Story;
  parentComment: Comment | null;
  replies: Comment[];
}
