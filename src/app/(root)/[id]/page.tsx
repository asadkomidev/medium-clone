import { WrittenByAuthor } from "@/modules/author/components/written-by-author";
import { getPublishedStory } from "@/modules/story/actions/story";
import { StoryPage } from "@/modules/story/pages/story-page";

export default async function Page({ params }: { params: { id: string } }) {
  const response = await getPublishedStory(params.id);
  return (
    <>
      <StoryPage story={response} />
    </>
  );
}
