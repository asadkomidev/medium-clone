"use client";

import React, { useState, useTransition } from "react";
import { toast } from "sonner";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { createReply } from "@/modules/story/actions/reply";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";

type Props = {
  storyId: string;
  commentId: string;
  setShowCommentArea: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ReplyForm = ({
  commentId,
  storyId,
  setShowCommentArea,
}: Props) => {
  const [content, setContent] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const user = useUser();
  const router = useRouter();

  const replyComment = async () => {
    if (!user) {
      router.push("/auth/signin");
      return;
    }
    startTransition(async () => {
      const response = await createReply(storyId, commentId, content || ""); // Add default value of an empty string
      if (response) {
        toast.success("Reply created");
        setContent("");
      } else {
        toast.error("Error creating comment");
      }
    });
  };
  return (
    <div className="m-4 shadow-sm">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="what is your thoughts?"
        className="w-full h-[100px] p-3 focus:outline-none placeholder:text-sm text-sm mt-3"
      />
      <div className="flex flex-row-reverse p-3">
        <div className="flex items-center space-x-4">
          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={() => {
              setShowCommentArea(false);
              setContent("");
            }}
            className="text-sm">
            Cancel
          </Button>
          <Button onClick={replyComment} size={"sm"} className="w-20">
            <Spinner isPending={isPending} label="Respond" />
          </Button>
        </div>
      </div>
    </div>
  );
};
