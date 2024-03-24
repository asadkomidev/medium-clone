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
import { RenderClaps } from "@/modules/story/components/clap/render-claps";
import { Comments } from "@/modules/story/components/comment/comments";
import { Bookmarks } from "@/modules/story/components/bookmark/bookmarks";
import { Shares } from "@/modules/story/components/share/shares";

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
    <div className="flex items-center justify-between">
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
