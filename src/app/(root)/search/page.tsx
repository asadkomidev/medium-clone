import SearchList from "@/modules/shared/navbar/search-list";
import { getStory } from "@/modules/story/actions/story";
import { NewStoryPage } from "@/modules/story/pages/new-story-page";

export default async function Page() {
  return (
    <div className="">
      <SearchList />
    </div>
  );
}
