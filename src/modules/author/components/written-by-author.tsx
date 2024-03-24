type Props = {
  author: User | null | undefined;
  stories: StoryWithDetails[];
  isFollowing: boolean;
  followers: number;
};

import { AuthorDetails } from "./author-details";
import SecondaryContainer from "@/components/secondary-container";
import { User } from "@prisma/client";
import { StoryWithDetails } from "@/modules/story/types/story-type";
import { AuthorStoryCard } from "./author-story-card";
import { StoryCardSkeleton } from "./story-card-skeleton";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const WrittenByAuthor = ({
  author,
  isFollowing,
  stories,
  followers,
}: Props) => {
  return (
    <SecondaryContainer className="">
      <div className="">
        <AuthorDetails
          author={author}
          isFollowing={isFollowing}
          followers={followers}
        />
      </div>
      <div className="">
        <p className="pb-6 text-lg font-semibold">More from {author?.name}</p>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.length === 0 ? (
              <>
                <div className="py-6">
                  <div className="flex items-center justify-center">
                    No stories found
                  </div>
                </div>
              </>
            ) : (
              <>
                {stories.map((story) => (
                  <div key={story.id} className="">
                    <Suspense fallback={<StoryCardSkeleton />}>
                      <AuthorStoryCard story={story} />
                    </Suspense>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="py-6">
          <Separator />
          <div className="py-6">
            <Link
              href={`/author/${author?.id}`}
              className="text-primary my-6 border p-2 rounded-md text-sm">
              See all from {author?.name}
            </Link>
          </div>
        </div>
      </div>
    </SecondaryContainer>
  );
};
