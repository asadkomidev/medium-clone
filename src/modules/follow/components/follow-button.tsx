"use client";

type Props = {
  authorId?: string;
  isFollowing: boolean;
  className?: string;
};

import { useOptimistic, useTransition } from "react";
import { followAuthor, unfollowAuthor } from "../actions/follow";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const FollowButton = ({ authorId, isFollowing, className }: Props) => {
  const [isPending, startTransition] = useTransition();
  const user = useUser();
  const router = useRouter();

  const [optIsFollowing, addIsFollowing] = useOptimistic(
    isFollowing,
    (state: boolean) => !state
  );

  const onFollow = async () => {
    if (!user) {
      router.push("/auth/signin");
      return;
    }
    addIsFollowing(true);
    startTransition(async () => {
      const response = await followAuthor(authorId!);
      if (response) {
        toast.success("You are now following this author");
      } else {
        toast.error("Failed to follow author");
      }
    });
  };

  const onUnfollow = async () => {
    if (!user) {
      router.push("/auth/signin");
      return;
    }
    addIsFollowing(false);
    startTransition(async () => {
      const response = await unfollowAuthor(authorId!);
      if (response) {
        toast.success("You are no longer following this author");
      } else {
        toast.error("Failed to unfollow author");
      }
    });
  };
  return (
    <Button
      size={"sm"}
      variant={"link"}
      disabled={authorId === user?.id}
      onClick={isFollowing ? onUnfollow : onFollow}
      className={cn(
        "",
        `${
          optIsFollowing && className
            ? "bg-secondary px-4 py-1 rounded-md text-black text-sm"
            : className
        }`
      )}>
      {user && optIsFollowing ? (
        <span className={className ? "" : "text-muted-foreground"}>
          Following
        </span>
      ) : (
        <span className={className ? "" : "text-green-600"}>Follow</span>
      )}
    </Button>
  );
};
