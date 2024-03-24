"use client";

import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";

import { useUser } from "@/hooks/use-user";
import { ClapIcon, ClapIconDark } from "@/modules/shared/icons/clap-icon";
import {
  clap,
  clapOnComment,
  unClapOnComment,
} from "@/modules/story/actions/clap";

type Props = {
  claps: number;
  clapsByUser: number;
  commentId?: string;
  storyId: string;
};

export const RenderClaps = ({
  claps,
  clapsByUser,
  commentId,
  storyId,
}: Props) => {
  const user = useUser();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [optClap, addClap] = useOptimistic(
    claps,
    (state, amount) => state + Number(amount)
  );
  const [optClapsByUser, addClapsByUser] = useOptimistic(
    clapsByUser,
    (state, amount) => state + Number(amount)
  );

  const onClap = async (amount: number) => {
    if (!user) {
      router.push("/auth/signin");
      return;
    }
    startTransition(async () => {
      if (!commentId) {
        addClap(amount);
        addClapsByUser(amount);
        await clap(storyId);
      } else {
        addClap(amount);
        addClapsByUser(amount);
        await clapOnComment(storyId, commentId);
      }
    });
  };

  const onUnclap = async (amount: number) => {
    if (!user) {
      router.push("/auth/signin");
      return;
    }
    startTransition(async () => {
      if (!commentId) {
        addClap(-amount);
        addClapsByUser(-amount);
        await unClapOnComment(storyId, commentId);
      }
    });
  };

  return (
    <div className="">
      <div className="flex items-center gap-2 text-muted-foreground">
        {user && optClapsByUser > 0 ? (
          <span onClick={() => onUnclap(1)} className="cursor-pointer">
            <ClapIconDark />
          </span>
        ) : (
          <span onClick={() => onClap(1)} className="cursor-pointer">
            <ClapIcon />
          </span>
        )}

        <span className="text-sm">{optClap}</span>
      </div>
    </div>
  );
};
