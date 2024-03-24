"use client";

import {
  BookmarkIcon,
  BookmarkIconDark,
} from "@/modules/shared/icons/bookmark-icon";
import { use, useEffect, useOptimistic, useState, useTransition } from "react";

import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import {
  getBookmark,
  removeBookmark,
  saveBookmark,
} from "@/modules/story/actions/bookmark";

type Props = {
  storyId: string;
};

export const Bookmarks = ({ storyId }: Props) => {
  const user = useUser();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const [optSaveBookmark, addSaveBookmark] = useOptimistic(
    isBookmarked,
    (state: boolean) => !state
  );

  useEffect(() => {
    const getIsBookmarked = async () => {
      const res = await getBookmark(storyId);
      setIsBookmarked(res || false);
    };
  }, [isBookmarked]);

  const saveBookmarks = () => {
    if (!user) {
      router.push("/auth/signin");
      return;
    }
    startTransition(async () => {
      addSaveBookmark(true);
      try {
        const response = await saveBookmark(storyId);
        if (response) {
          toast.success("Bookmark saved");
        } else {
          toast.error("Bookmark removed");
        }
      } catch (error) {
        toast.error("Error saving bookmark");
      }
    });
  };
  const removeBookmarks = () => {
    if (!user) {
      router.push("/auth/signin");
      return;
    }
    startTransition(async () => {
      addSaveBookmark(false);
      try {
        const response = await removeBookmark(storyId);
        if (response) {
          toast.success("Bookmark removed");
        } else {
          toast.error("Bookmark not removed");
        }
      } catch (error) {
        toast.error("Error saving bookmark");
      }
    });
  };
  return (
    <div className="">
      {user && optSaveBookmark ? (
        <div
          onClick={() => removeBookmarks()}
          className="text-muted-foreground cursor-pointer">
          <BookmarkIconDark />
        </div>
      ) : (
        <div
          onClick={() => saveBookmarks()}
          className="text-muted-foreground cursor-pointer">
          <BookmarkIcon />
        </div>
      )}
    </div>
  );
};
