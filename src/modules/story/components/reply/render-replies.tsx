"use client";

import { useEffect, useState } from "react";

import { clapCount, clapCountByUser } from "@/modules/story/actions/clap";
import { commentsType } from "@/modules/story/types/comment-type";
import { RenderComments } from "../comment/render-comments";

type Props = {
  storyId: string;
  commentId: string;
  comments: commentsType[] | null | undefined;
};

export const RenderReplies = ({ storyId, commentId, comments }: Props) => {
  const [userClaps, setUserClaps] = useState<number>();
  const [totalClaps, setTotalClaps] = useState<number>();

  useEffect(() => {
    const fetchClapCountByUser = async () => {
      try {
        const claps = await clapCountByUser(storyId, commentId);
        setUserClaps(claps);
      } catch (error) {
        console.log("Error fetching the user claps");
      }
    };

    const fetchTotalClaps = async () => {
      try {
        const claps = await clapCount(storyId, commentId);
        setTotalClaps(claps);
      } catch (error) {
        console.log("Error fetching the  claps");
      }
    };

    fetchTotalClaps();
    fetchClapCountByUser();
  }, [storyId, commentId]);
  return (
    <div className="">
      <div className="border-l pl-4">
        <RenderComments
          // @ts-ignore
          comments={comments}
        />
      </div>
    </div>
  );
};
