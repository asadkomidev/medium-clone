"use client";

import { FaUser } from "react-icons/fa";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User } from "@prisma/client";
import { FollowButton } from "@/modules/follow/components/follow-button";
import { useRouter } from "next/navigation";

type Props = {
  author: User | null | undefined;

  isFollowing: boolean;
  followers: number;
};

export const AuthorDetails = ({ author, isFollowing, followers }: Props) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/author/${author?.id}`)}
      className="py-6 cursor-pointer">
      <Separator />
      <div className="flex items-end justify-between py-12 ">
        <div className="flex flex-col gap-4 ">
          <div className="">
            <Avatar className="w-14 h-14">
              <AvatarImage src={author?.image || ""} />
              <AvatarFallback className=" bg-stone-200 dark:bg-stone-600">
                <FaUser size={30} className="text-white" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="">
            <p className="text-lg font-semibold">Written by {author?.name}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="">{followers} Followers</span>
              <span className="">Topic</span>
            </div>
          </div>
        </div>
        <div className="">
          <FollowButton
            authorId={author?.id}
            isFollowing={isFollowing}
            className="bg-green-600 px-4 py-1 rounded-md text-white text-sm"
          />
        </div>
      </div>
      <Separator />
    </div>
  );
};
