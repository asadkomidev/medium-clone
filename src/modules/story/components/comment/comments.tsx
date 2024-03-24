"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { CommentIcon } from "@/modules/shared/icons/comment-icon";
import { StoryType } from "@/modules/story/types/story-type";
import { commentsType } from "@/modules/story/types/comment-type";

import { RenderComments } from "./render-comments";
import { CommentForm } from "./comment-form";

type Props = {
  story: StoryType | null | undefined;
  commentsCount: number;
  comments: commentsType[];
};

export const Comments = ({ story, commentsCount, comments }: Props) => {
  return (
    <Sheet>
      <SheetTrigger className="flex items-center gap-2 text-muted-foreground text-sm">
        <CommentIcon />
        <span>{commentsCount}</span>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle className="-mt-3">Responses ({commentsCount})</SheetTitle>
        </SheetHeader>
        <div className="pt-6 md:pt-12">
          <CommentForm storyId={story?.id!} comments={comments} />
        </div>
        <div className="py-6">
          <RenderComments comments={comments} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
