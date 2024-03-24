import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { FaUser } from "react-icons/fa";

import { clapCount, clapCountByUser } from "@/modules/story/actions/clap";
import { StoryType, StoryWithDetails } from "@/modules/story/types/story-type";
import { commentCount, getComments } from "@/modules/story/actions/comment";
import { getBookmark } from "@/modules/story/actions/bookmark";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardDescription } from "@/components/ui/card";

import { calculateReadTime, getTitleDescriptionImage } from "@/lib/helpers";

type Props = {
  story: StoryWithDetails;
};

export const SearchCard = async ({ story }: Props) => {
  const result = getTitleDescriptionImage(story.content!);

  const readTime = calculateReadTime(story?.content ?? "");

  return (
    <div className="flex flex-col justify-between h-full pb-8">
      <Link href={`/${story.id}`} className="">
        <Image
          src={result.image || ""}
          alt="story-image"
          width={400}
          height={200}
          className="object-cover aspect-video"
        />
      </Link>
      {/*<div className="pt-4 flex items-center gap-2">
        <div className="">
          <Avatar className="w-6 h-6">
            <AvatarImage src={story.author.image || ""} />
            <AvatarFallback className=" bg-stone-200 dark:bg-stone-600">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs">{story.author.name}</span>{" "}
          </div>
        </div>
      </div> */}
      <div className="cursor-pointer pt-4">
        <Link
          href={`/${story.id}`}
          className="text-lg font-semibold pb-1 line-clamp-2">
          {result.title}
        </Link>

        <Link href={`/${story.id}`} className="text-muted-foreground text-sm">
          {result.description}
        </Link>
        <div className=" py-4 flex items-center gap-2">
          <p className="text-xs text-muted-foreground">{readTime} min read</p> -
          <p className="text-xs text-muted-foreground">
            {format(story.createdAt, "MMM dd, yyyy")}
          </p>
        </div>
      </div>
    </div>
  );
};
