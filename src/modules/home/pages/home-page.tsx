import {
  getTopPicksStories,
  getPublishedStory,
  getStories,
} from "@/modules/story/actions/story";
import {
  getStoriesByTag,
  getTopics,
  getUserSelectedTopics,
} from "@/modules/topics/actions/topics";
import TopicList from "@/modules/topics/components/topic-list";
import { headers } from "next/headers";
import React from "react";
import { StoryPicks } from "../components/story-picks";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type Props = {
  //   params: { slug: string };
  //   searchParams: { tag: string };
};

const HomePage = async (props: Props) => {
  const data = await getUserSelectedTopics();
  const topics = await getTopics();
  const stories = await getTopPicksStories();

  return (
    <div className="flex min-h-full flex-col">
      <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 ">
        <main className="flex-1">
          <div className="w-full">
            <div className="pt-8">
              <TopicList
                // @ts-ignore
                topics={topics.data}
                tags={data.tags}
                // @ts-ignore
              />
            </div>

            {/* {children} */}
          </div>
        </main>
        <aside className="sticky hidden top-8 w-96 shrink-0 lg:block border-l h-screen">
          <div className="p-6 flex flex-col">
            <div className="">
              <p className="font-semibold">Top picks</p>
              <div className="py-4">
                <Separator />
              </div>
            </div>
            {stories?.map((story, i) => (
              <StoryPicks
                key={i}
                // @ts-ignore
                story={story}
              />
            ))}
          </div>
          <div className="p-6 flex flex-col">
            <div className="">
              <p className="font-semibold">Recommended topics</p>
              <div className="py-4">
                <Separator />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {topics.data?.map((topic, i) => (
                <Badge key={i} variant="secondary" className="p-2">
                  <Link href={`/?tag=${topic.value}`}>{topic.label}</Link>
                </Badge>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
