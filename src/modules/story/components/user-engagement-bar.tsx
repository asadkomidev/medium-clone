"use client";

type Props = {
  story: StoryType | null | undefined;
  claps: number;
  clapsByUser: number;
  commentsCount: number;
  comments: commentsType[] | null | undefined;
  storyId: string;
  isBookmarked: boolean;
};

const Url: string = process.env.NEXT_PUBLIC_APP_URL!;

import { StoryType } from "@/modules/story/types/story-type";
import { commentsType } from "@/modules/story/types/comment-type";
import { RenderClaps } from "./clap/render-claps";
import { Comments } from "./comment/comments";
import { Bookmarks } from "./bookmark/bookmarks";
import { Shares } from "./share/shares";
import ShareButtons from "./share/share-buttons";

export const UserEngagementBar = ({
  story,
  claps,
  clapsByUser,
  commentsCount,
  comments,
  storyId,
  isBookmarked,
}: Props) => {
  const url = `${Url}/${story?.id}`;
  return (
    <div className="flex items-center justify-between my-4 border-y py-2 px-2">
      <div className="flex items-center justify-center gap-6">
        <div className="">
          <RenderClaps
            storyId={storyId}
            claps={claps}
            clapsByUser={clapsByUser}
          />
        </div>
        <div className="">
          <Comments
            commentsCount={commentsCount}
            story={story}
            // @ts-ignore
            comments={comments}
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-6">
        <div className="">
          <Bookmarks storyId={storyId} isBookmarked={isBookmarked} />
        </div>
        <div className="">
          <Shares url={url} quote="" />
        </div>
      </div>
    </div>
  );
};
