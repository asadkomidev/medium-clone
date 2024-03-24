import { StoryType } from "../types/story-type";
import { RenderStory } from "../components/render-story";

type Props = {
  story: StoryType | null | undefined;
};

export const StoryPage = ({ story }: Props) => {
  return <RenderStory story={story} />;
};
