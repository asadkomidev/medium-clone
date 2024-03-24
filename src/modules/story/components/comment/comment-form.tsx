"use client";

import { useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";

import { useUser } from "@/hooks/use-user";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/spinner";

import { commentsType } from "../../types/comment-type";
import { createComment } from "../../actions/comment";
import Author from "@/modules/author/components/author";
import { useRouter } from "next/navigation";

type Props = {
  storyId: string;

  comments: commentsType[];
};

export const CommentForm = ({ storyId, comments }: Props) => {
  const [content, setContent] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [optComments, addComment] = useOptimistic(
    comments,
    (state, comment: string) =>
      [...state, { content: comment }] as commentsType[]
  );

  const router = useRouter();
  const user = useUser();

  const handleComment = () => {
    if (!user) {
      router.push("/auth/signin");
      return;
    }
    startTransition(async () => {
      const response = await createComment(storyId, content!);
      if (response) {
        toast.success(response.message);
        setContent("");
      } else {
        toast.error("Error creating comment");
      }
    });
  };

  return (
    <div className="rounded-md shadow-sm">
      {user && (
        <div className="flex items-center space-x-3 px-3 pt-3">
          <Author image={user?.image || ""} name={user?.name || ""} />
        </div>
      )}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="what is your thoughts?"
        className="w-full h-[100px] p-3 focus:outline-none placeholder:text-sm text-sm mt-3"
      />
      <div className="flex flex-row-reverse p-3">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setContent("")}
            className="w-24"
            size="sm"
            variant="ghost">
            Cancel
          </Button>
          <Button onClick={() => handleComment()} className="w-20" size="sm">
            <Spinner isPending={isPending} label="Respond" />
          </Button>
        </div>
      </div>
    </div>
  );
};
