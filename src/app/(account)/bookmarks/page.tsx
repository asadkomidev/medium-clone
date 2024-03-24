import { getAllBookmarks } from "@/modules/dashboard/bookmarks/actions/bookmarks";
import { BookmarksPage } from "@/modules/dashboard/bookmarks/pages/bookmarks-page";

export default async function Page() {
  const bookmarks = (await getAllBookmarks()) || [];
  return (
    <BookmarksPage
      // @ts-ignore
      bookmarks={bookmarks}
    />
  );
}
