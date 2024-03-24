import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";

import { clapCount, clapCountByUser } from "@/modules/story/actions/clap";
import { StoryType } from "@/modules/story/types/story-type";
import { commentCount, getComments } from "@/modules/story/actions/comment";
import { getBookmark } from "@/modules/story/actions/bookmark";

import { calculateReadTime, getTitleDescriptionImage } from "@/lib/helpers";
import { UserEngagementBar } from "@/modules/author/components/user-engagement-bar";
import { useEffect, useState } from "react";

type Props = {
  story: StoryType;
};

export const StoryCard = ({ story }: Props) => {
  const [claps, setClaps] = useState(0);
  const [clapsByUser, setClapsByUser] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const result = getTitleDescriptionImage(story.content!);
  const readTime = calculateReadTime(story?.content ?? "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setClaps(await clapCount(story?.id!));
        setClapsByUser(await clapCountByUser(story?.id!));
        setCommentsCount(await commentCount(story?.id!));
        setComments((await getComments(story?.id!)) as any);
        setIsBookmarked((await getBookmark(story?.id!)) as any);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [claps, clapsByUser, commentsCount, comments, isBookmarked]);

  return (
    <div className="flex flex-col justify-between h-full pb-8">
      <div className="flex items-center gap-x-4 md:gap-x-16">
        {/* Content */}
        <div className="basis-full">
          <div className=" py-2 flex items-center gap-2">
            <p className="text-xs text-muted-foreground">
              Published on {format(story.createdAt, "MMM dd, yyyy")}
            </p>{" "}
            -
            <p className="text-xs text-muted-foreground">{readTime} min read</p>{" "}
          </div>
          <div className="cursor-pointer pb-4">
            <Link
              href={`/${story.id}`}
              className="text-sm md:text-lg font-semibold pb-1 line-clamp-2">
              {result.title}
            </Link>

            <Link
              href={`/${story.id}`}
              className="text-muted-foreground text-sm">
              {result.description}
            </Link>
          </div>

          <div>
            <UserEngagementBar
              story={story}
              storyId={story?.id!}
              claps={claps}
              clapsByUser={clapsByUser}
              commentsCount={commentsCount}
              // @ts-ignore
              comments={comments}
              // @ts-ignore
              isBookmarked={isBookmarked}
            />
          </div>
        </div>
        {/* image */}
        <div className="flex justify-end">
          <Link href={`/${story.id}`} className="">
            <Image
              src={result.image || ""}
              alt="story-image"
              width={100}
              height={100}
              className="object-cover aspect-square"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
