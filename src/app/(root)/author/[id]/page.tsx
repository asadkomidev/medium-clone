import {
  getAllStoriesByAuthor,
  getAuthor,
} from "@/modules/author/actions/author";
import { AuthorStoriesPage } from "@/modules/author/pages/author-stories-page";

export default async function Page({ params }: { params: { id: string } }) {
  const stories = await getAllStoriesByAuthor(params.id);
  const author = await getAuthor(params.id);

  return (
    <AuthorStoriesPage
      // @ts-ignore
      stories={stories}
      // @ts-ignore
      author={author}
    />
  );
}

// tsrafc
