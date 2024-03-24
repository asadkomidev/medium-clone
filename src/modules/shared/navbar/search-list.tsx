"use client";

import { StoryCardSkeleton } from "@/modules/author/components/story-card-skeleton";
import { getStoriesByTag } from "@/modules/topics/actions/topics";
import { Story } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { SearchCard } from "./search-card";

type Props = {};

const SearchList = (props: Props) => {
  const [stories, setStories] = useState<Story[]>([]);
  const searchparams = useSearchParams();
  const searchValue = searchparams.get("for");

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await getStoriesByTag(searchValue || "All");
        setStories(response.data);
      } catch (error) {
        console.log("Error in fetching teh data");
      }
    };

    fetchStory();
  }, [searchparams]);
  return (
    <div className="py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                  <SearchCard
                    // @ts-ignore
                    story={story}
                  />
                </Suspense>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchList;
