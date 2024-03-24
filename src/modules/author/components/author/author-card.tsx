"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";

import { User } from "@prisma/client";
import { FollowButton } from "@/modules/follow/components/follow-button";

type Props = {
  author: User;
  isFollowing: boolean;
  followers: number;
};

const AuthorCard = ({ author, isFollowing, followers }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="">
        <Avatar className="w-16 h-16">
          <AvatarImage src={author.image || ""} />
          <AvatarFallback className=" bg-stone-200 dark:bg-stone-600">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="py-4">
        <h1 className="text-base font-semibold">{author.name || ""}</h1>
        <p className="text-sm text-gray-500">{followers} Followers</p>
      </div>
      <div className="flex flex-col mt-2">
        <h1 className="text-semibold">Medium certified</h1>
        <p className="text-muted-foreground text-sm mt-2">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English.
        </p>
      </div>
      <div className="py-6">
        <FollowButton
          authorId={author.id}
          isFollowing={isFollowing}
          className="bg-green-600 px-4 py-1 rounded-md text-white text-sm"
        />
      </div>
    </div>
  );
};

export default AuthorCard;
