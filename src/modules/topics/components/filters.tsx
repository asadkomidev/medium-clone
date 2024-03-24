"use client";

import Link from "next/link";
import { TopicType } from "../types/topic";
import { NewTagButton } from "./new-tag-button";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getStoriesByTag } from "../actions/topics";
import { Story } from "@prisma/client";
import { StoryCard } from "./story-card";
import { StoryCardSkeleton } from "./story-card-skeleton";
import FilterBar from "./filter-bar";
import FilterMobile from "./filter-mobile";

type Props = {
  topics: TopicType[];
  tags: TopicType[];
};

const Filters = ({ topics, tags }: Props) => {
  const [stories, setStories] = useState<Story[]>([]);
  const searchparams = useSearchParams();
  const tag = searchparams.get("tag");

  useEffect(() => {
    const getStories = async () => {
      try {
        const response = await getStoriesByTag(tag || "All");

        setStories(response.data);
      } catch (error) {
        console.log("Error in fetching teh data");
      }
    };

    getStories();
  }, [searchparams]);

  return (
    <div className="flex flex-col ">
      <div className="">
        {tags.length >= 3 ? (
          <FilterMobile topics={topics} tag={tag || ""} tags={tags} />
        ) : (
          <FilterBar topics={topics} tag={tag || ""} tags={tags} />
        )}
      </div>

      <div className="py-6">
        {stories.length === 0 ? (
          <>
            <div className="py-6">
              <div className="flex items-center justify-center">
                <StoryCardSkeleton />
              </div>
            </div>
          </>
        ) : (
          <>
            {stories?.map((story) => (
              <Suspense key={story.id} fallback={<StoryCardSkeleton />}>
                <StoryCard
                  // @ts-ignore
                  story={story}
                />
              </Suspense>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Filters;
