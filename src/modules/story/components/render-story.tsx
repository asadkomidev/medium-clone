import {
  calculateReadTime,
  getTitleDescriptionImage,
  sanitizeContent,
} from "@/lib/helpers";

import { StoryType } from "../types/story-type";
import { StoryLayout } from "./story-layout";
import { UserEngagementBar } from "./user-engagement-bar";
import { clapCount, clapCountByUser } from "../actions/clap";
import { commentCount, getComments } from "../actions/comment";
import { getBookmark } from "../actions/bookmark";
import {
  checkFollowingExists,
  getNumberOfFollowers,
} from "@/modules/follow/actions/follow";
import { FollowButton } from "@/modules/follow/components/follow-button";
import { format } from "date-fns";
import Author from "@/modules/author/components/author";
import { WrittenByAuthor } from "@/modules/author/components/written-by-author";
import { getStoriesByAuthor } from "@/modules/author/actions/author";
import "highlight.js/styles/github.css";

type Props = {
  story: StoryType | null | undefined;
};

export const RenderStory = async ({ story }: Props) => {
  const result = getTitleDescriptionImage(story?.content!);
  const claps = await clapCount(story?.id!);
  const clapsByUser = await clapCountByUser(story?.id!);
  const commentsCount = await commentCount(story?.id!);
  const comments = await getComments(story?.id!);
  const isBookmarked = await getBookmark(story?.id!);
  const isFollowing = await checkFollowingExists(story?.author.id!);

  const authorStories = await getStoriesByAuthor(story?.author.id!, story?.id!);
  const followers = await getNumberOfFollowers(story?.author.id!);
  const readTime = calculateReadTime(story?.content ?? "");
  const date = format(new Date(story?.createdAt!), "MMM dd, yyyy");
  const content = sanitizeContent(story?.content!);

  return (
    <StoryLayout title={result.title} intro={result.description}>
      <div className="">
        <Author
          image={story?.author.image || ""}
          name={story?.author.name || ""}
          date={`Published on ${date} `}
          read={`- ${readTime} min read `}>
          <span className="">
            <FollowButton
              authorId={story?.author.id}
              isFollowing={isFollowing}
            />
          </span>
        </Author>

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

        <div className="flex mx-auto">
          <div
            className=" prose pb-12 prose-headings:dark:text-white text-muted-foreground prose-li:dark:text-muted-foreground prose-a:dark:text-muted-foreground prose-strong:dark:text-muted-foreground prose-blockquote:dark:text-muted-foreground "
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
      <WrittenByAuthor
        author={story?.author}
        isFollowing={isFollowing}
        // @ts-ignore
        stories={authorStories}
        followers={followers}
      />
    </StoryLayout>
  );
};
