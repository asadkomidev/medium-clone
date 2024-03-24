"use client";

import { commentsType } from "@/modules/story/types/comment-type";
import { calculateDaysAgo } from "@/lib/helpers";

import { UserEngagement } from "./user-engagement";

import { Actions } from "./actions";
import Author from "@/modules/author/components/author";
import { useUser } from "@/hooks/use-user";

type Props = {
  comments: commentsType[] | null | undefined;
};

export const RenderComments = ({ comments }: Props) => {
  const user = useUser();

  return (
    <div className="">
      {comments?.map((comment, index) => {
        const clapCounts = comment.Clap?.map((clap) => clap.clapCount);
        const totalClaps = clapCounts?.reduce((acc, curr) => acc + curr, 0);
        return (
          <div
            key={index}
            className=" mt-5 py-4 border-b-[1px] border-neutral-100">
            <div className="flex items-center space-x-3  pt-3 justify-between">
              <Author
                image={comment.user?.image || ""}
                name={comment.user?.name || ""}
                date={
                  calculateDaysAgo(comment.createdAt) < 2
                    ? "day ago"
                    : `${calculateDaysAgo(comment.createdAt)} days ago`
                }
              />
              <div className="">
                {user?.id === comment.userId && <Actions id={comment.id} />}
              </div>
            </div>
            <p className="py-3 text-neutral-600 text-sm">{comment.content}</p>

            <UserEngagement comment={comment} clapsCount={totalClaps || 0} />
          </div>
        );
      })}
    </div>
  );
};
