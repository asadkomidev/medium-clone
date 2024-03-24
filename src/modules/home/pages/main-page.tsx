import { getTopPicksStoriesMain } from "@/modules/story/actions/story";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { StoryPicksMain } from "../components/story-picks-main";
import { getTopics } from "@/modules/topics/actions/topics";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { calculateReadTime, getTitleDescriptionImage } from "@/lib/helpers";
import StoryCardHome from "../components/story-card-home";

type Props = {};

const MainPage = async (props: Props) => {
  const stories = await getTopPicksStoriesMain();
  const topics = await getTopics();

  return (
    <main className="">
      <div className="flex flex-col md:flex-row items-center gap-16 h-[400px] py-12">
        <div className="w-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-7xl font-bold">Stay curious.</h1>
          <p className="py-4 text-lg">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <div className="py-6">
            <Button className="max-w-32">Start reading</Button>
          </div>
        </div>
        <div className="w-full"></div>
      </div>
      <div className="pb-12">
        <Separator />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {stories?.map((story, i) => (
          <StoryPicksMain
            key={i}
            index={i + 1}
            // @ts-ignore
            story={story}
          />
        ))}
      </div>
      <div className="pt-12">
        <Separator />
      </div>
      {/* Cards */}
      <div className="flex min-h-full flex-col">
        <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 ">
          <main className="flex-1">
            {/* topic */}
            <div className="flex flex-col pt-12 md:hidden">
              <div className="pb-4">
                <p className="text-sm font-semibold">Recommended topics</p>
              </div>
              <div className="flex items-center gap-2">
                {topics.data?.map((topic, i) => (
                  <Badge key={i} variant="secondary" className="p-2">
                    <Link href={`/?tag=${topic.value}`}>{topic.label}</Link>
                  </Badge>
                ))}
              </div>
              <div className="py-12">
                <Separator />
              </div>
            </div>
            {/* topic */}
            <div className="flex flex-col pt-12">
              {stories?.map((story, i) => (
                <StoryCardHome
                  key={i}
                  // @ts-ignore
                  story={story}
                />
              ))}
            </div>
          </main>
          <aside className="sticky hidden top-0 w-96 shrink-0 lg:block  h-screen">
            <div className="px-6 pt-12">
              <div className="flex flex-col">
                <div className="pb-4">
                  <p className="text-sm font-semibold">Recommended topics</p>
                </div>
                <div className="flex items-center gap-2">
                  {topics.data?.map((topic, i) => (
                    <Badge key={i} variant="secondary" className="p-2">
                      <Link href={`/?tag=${topic.value}`}>{topic.label}</Link>
                    </Badge>
                  ))}
                </div>
                <div className="py-12">
                  <Separator />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      {/* Cards */}
    </main>
  );
};

export default MainPage;
