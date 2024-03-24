import { AccountPageLayout } from "@/modules/shared/layouts/account-page-layout";
import { Story } from "@prisma/client";
import { StoryCard } from "../components/story-card";

type Props = {
  stories: Story[];
};

export const PublishedPage = ({ stories }: Props) => {
  return (
    <AccountPageLayout
      title="Published"
      description="Manage your published stories in here ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stories?.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </AccountPageLayout>
  );
};
