import { BookMarked, Bookmark, Notebook, Settings, User } from "lucide-react";

export const accountNavigationLinks = [
  // {
  //   title: "Profile",
  //   href: "/account/profile",
  // },
  {
    id: 1,
    title: "Account",
    href: "/account",
    icon: User,
  },
  {
    id: 2,
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
export const dashboardNavigationLinks = [
  {
    id: 1,
    title: "Published",
    href: "/my-stories",
    icon: Notebook,
  },
  {
    id: 2,
    title: "Drafts",
    href: "/drafts",
    icon: BookMarked,
  },
  {
    id: 3,
    title: "Bookmarks",
    href: "/bookmarks",
    icon: Bookmark,
  },
];
