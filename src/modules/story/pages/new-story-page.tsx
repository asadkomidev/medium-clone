import SecondaryContainer from "@/components/secondary-container";
import { StoryEditor } from "../components/editor/story-editor";

type Props = {
  id: string;
  content: string | null | undefined;
  publish: boolean | undefined;
};

export const NewStoryPage = ({ id, content, publish }: Props) => {
  return (
    <SecondaryContainer className="min-h-[80vh] py-12 ">
      <StoryEditor id={id} content={content} publish={publish} />
    </SecondaryContainer>
  );
};
