import { DraftsPage } from "@/modules/dashboard/drafts/pages/drafts-page";
import { PublishedPage } from "@/modules/dashboard/published/pages/published-page";
import { getMyDraftsStories } from "@/modules/story/actions/story";

export default async function Page() {
  const stories = (await getMyDraftsStories()) || [];
  return <DraftsPage stories={stories} />;
}
