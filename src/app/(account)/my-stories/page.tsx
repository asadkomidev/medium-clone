import { PublishedPage } from "@/modules/dashboard/published/pages/published-page";
import { getMyPublishedStories } from "@/modules/story/actions/story";

export default async function Page() {
  const stories = (await getMyPublishedStories()) || [];
  return <PublishedPage stories={stories} />;
}
