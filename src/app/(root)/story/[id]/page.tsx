import { getStory } from "@/modules/story/actions/story";
import { NewStoryPage } from "@/modules/story/pages/new-story-page";

export default async function Page({ params }: { params: { id: string } }) {
  const response = await getStory(params.id);
  return (
    <NewStoryPage
      id={params.id}
      content={response?.content}
      publish={response?.publish}
    />
  );
}
