import { AccountPageLayout } from "@/modules/shared/layouts/account-page-layout";
import { Save, Story } from "@prisma/client";
import { StoryCard } from "../components/story-card";
import { StoryType } from "@/modules/story/types/story-type";

type Props = {
  bookmarks: StoryType[];
};

export const BookmarksPage = ({ bookmarks }: Props) => {
  return (
    <AccountPageLayout
      title="Bookmarks"
      description="Manage your bookmarks stories in here ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {bookmarks?.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </AccountPageLayout>
  );
};
