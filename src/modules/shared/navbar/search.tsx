"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Search = () => {
  const [SearchInput, setSearchInput] = useState<string>("");

  const router = useRouter();

  const SearchFun = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/search?for=${SearchInput}`);
    }
  };
  return (
    <div className="hidden md:flex items-center rounded-lg px-2 bg-stone-100 dark:bg-stone-800">
      <SearchIcon
        onClick={() => router.push(`/search?for${SearchInput}`)}
        size={20}
        className="opacity-50 mr-2 text-muted-foreground"
      />
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => SearchFun(e)}
        type="text"
        placeholder="Search"
        className="focus:outline-none px-1 py-2 placeholder:text-sm text-muted-foreground text-sm bg-transparent"
      />
    </div>
  );
};
