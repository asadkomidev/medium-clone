import { StoryWithDetails } from "@/modules/story/types/story-type";
import { User } from "@prisma/client";

import AuthorCard from "./author-card";
import { Suspense } from "react";
import { AuthorStoryCard } from "./author-story-card";
import { StoryCardSkeleton } from "../story-card-skeleton";
import { Separator } from "@/components/ui/separator";

type Props = {
  stories: StoryWithDetails[] | null | undefined;
  author: User;
  isFollowing: boolean;
  children?: React.ReactNode;
  followers: number;
};

export const AuthorStories = ({
  stories,
  author,
  isFollowing,
  children,
  followers,
}: Props) => {
  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 ">
        <main className="flex-1">
          <div className="w-full">
            <div className="pt-24">
              <p className="text-3xl font-semibold pb-6">{author.name}</p>
              <Separator />
            </div>

            {children}
          </div>
        </main>
        <aside className="sticky hidden top-8 w-96 shrink-0 md:block border-l h-screen">
          <div className="p-12">
            <AuthorCard
              author={author}
              isFollowing={isFollowing}
              followers={followers}
            />
          </div>
        </aside>
      </div>
    </div>
  );
};
