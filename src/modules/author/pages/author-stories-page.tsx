import { StoryType, StoryWithDetails } from "@/modules/story/types/story-type";
import { AuthorStories } from "../components/author/author-stories";
import { User } from "@prisma/client";
import {
  checkFollowingExists,
  getNumberOfFollowers,
} from "@/modules/follow/actions/follow";
import { Suspense } from "react";

import Author from "../components/author";
import { AuthorStoryCard } from "../components/author/author-story-card";
import { StoryCardSkeleton } from "../components/author/story-card-skeleton";

type Props = {
  stories: StoryWithDetails[] | null | undefined;
  author: User;
};

export const AuthorStoriesPage = async ({ stories, author }: Props) => {
  const isFollowing = await checkFollowingExists(author.id!);
  const followers = await getNumberOfFollowers(author.id!);

  return (
    <AuthorStories
      stories={stories}
      author={author}
      isFollowing={isFollowing}
      followers={followers}>
      <div className="py-8 flex md:hidden">
        <Author name={author.name || ""} image={author.image || ""} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 py-12">
        {stories?.map((story) => (
          <div key={story.id} className="">
            <Suspense fallback={<StoryCardSkeleton />}>
              <AuthorStoryCard story={story} />
            </Suspense>
          </div>
        ))}
      </div>
    </AuthorStories>
  );
};
