"use client";
import { format } from "date-fns";
import { getTitleDescriptionImage } from "@/lib/helpers";
import { Story } from "@prisma/client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { DeleteButton } from "./delete-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PublishSwitch } from "./publish-switch";
import Image from "next/image";

type Props = {
  story: Story;
};

export const StoryCard = ({ story }: Props) => {
  const router = useRouter();
  const result = getTitleDescriptionImage(story.content!);

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader
        onClick={() => router.push(`/${story.id}`)}
        className="cursor-pointer">
        <div className=" pb-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {format(story.createdAt, "MMM dd, yyyy")}
          </p>
          <Badge variant="secondary" className="">
            {story.topics[0]}
          </Badge>
        </div>
        <h1 className="text-lg font-semibold pb-1 line-clamp-2">
          {result.title}
        </h1>
        <CardDescription className="text-muted-foreground">
          {result.description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex items-center gap-4 justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="">
              <Button
                onClick={() => router.push(`/story/${story.id}`)}
                variant="link"
                className="text-blue-600 p-0">
                Edit
              </Button>
            </div>
            <div className="">
              <DeleteButton id={story.id} />
            </div>
          </div>
          <div className="">
            <PublishSwitch id={story.id} publish={story.publish} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
