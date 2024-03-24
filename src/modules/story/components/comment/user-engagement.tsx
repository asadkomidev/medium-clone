"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { clapCountByUser } from "@/modules/story/actions/clap";
import { commentsType } from "@/modules/story/types/comment-type";
import { getComments } from "@/modules/story/actions/comment";
import { CommentIcon } from "@/modules/shared/icons/comment-icon";

import { RenderClaps } from "../clap/render-claps";
import { RenderReplies } from "../reply/render-replies";
import { ReplyForm } from "../reply/reply-form";

type Props = {
  comment: commentsType;
  clapsCount: number;
};

export const UserEngagement = ({ comment, clapsCount }: Props) => {
  const [showCommentArea, setShowCommentArea] = useState<boolean>(false);
  const [showReplyComments, setShowReplyComments] = useState<boolean>(false);
  const [clapCount, setClapCount] = useState<number>(0);
  const [comments, setComments] = useState<commentsType[]>();
  const commentId = comment.id;
  const storyId = comment.storyId;

  useEffect(() => {
    const getUserClaps = async () => {
      try {
        const claps = await clapCountByUser(storyId, commentId);
        setClapCount(claps);
      } catch (error) {
        toast.error("Error getting claps");
      }
    };
    const getAllComments = async () => {
      const res = await getComments(storyId, commentId);
      if (res) {
        // @ts-ignore
        setComments(res);
      } else {
        setComments([]);
      }
    };
    getAllComments();
    getUserClaps();
  }, [commentId, storyId]);
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <RenderClaps
            storyId={storyId}
            claps={clapsCount}
            clapsByUser={clapCount}
            commentId={commentId}
          />
          <div className="">
            {/* @ts-ignore */}
            {comment?.replies?.length > 0 && (
              <button
                onClick={() => setShowReplyComments(!showReplyComments)}
                className="flex items-center gap-2 text-sm text-muted-foreground">
                <CommentIcon />
                {comment.replies?.length} Replies
              </button>
            )}
          </div>
        </div>
        <div>
          <button
            onClick={() => setShowCommentArea(!showCommentArea)}
            className="text-sm text-muted-foreground">
            Reply
          </button>
        </div>
      </div>
      <div className="">
        {showCommentArea && (
          <div className="">
            <ReplyForm
              storyId={storyId}
              commentId={commentId}
              setShowCommentArea={setShowCommentArea}
            />
          </div>
        )}
        {showReplyComments && (
          <div className="">
            <RenderReplies
              storyId={storyId}
              commentId={commentId}
              // @ts-ignore
              comments={comments}
            />
          </div>
        )}
      </div>
    </div>
  );
};
