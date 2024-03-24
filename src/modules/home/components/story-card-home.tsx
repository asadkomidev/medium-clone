import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { calculateReadTime, getTitleDescriptionImage } from "@/lib/helpers";
import { StoryWithDetails } from "@/modules/story/types/story-type";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { Bookmarks } from "./bookmarks";

type Props = {
  story: StoryWithDetails;
};

const StoryCardHome = ({ story }: Props) => {
  const result = getTitleDescriptionImage(story.content!);
  const readTime = calculateReadTime(story?.content ?? "");

  return (
    <div className="flex items-center gap-12 justify-between pb-12">
      <div className="pt-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
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
        </div>
        <div className="cursor-pointer">
          <Link
            href={`/${story.id}`}
            className=" font-semibold pb-1 line-clamp-2">
            {result.title}
          </Link>
          <Link
            href={`/${story.id}`}
            className="text-muted-foreground text-sm hidden md:block">
            {result.description}
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className=" flex items-center gap-2">
            <p className="text-xs text-muted-foreground">{readTime} min read</p>{" "}
            -
            <p className="text-xs text-muted-foreground">
              {format(story.createdAt, "MMM dd, yyyy")}
            </p>
            <Badge
              variant={"secondary"}
              className="text-xs font-light hidden md:block">
              {story?.topics[0]}
            </Badge>
          </div>
          <div className="">
            <Bookmarks
              // @ts-ignore
              story={story}
            />
          </div>
        </div>
      </div>
      <div className="">
        <Link href={`/${story.id}`} className="">
          <Image
            src={result.image || ""}
            alt="story-image"
            width={100}
            height={100}
            className="object-cover aspect-square h-auto max-w-lg"
          />
        </Link>
      </div>
    </div>
  );
};

export default StoryCardHome;
