import React from "react";
import { TopicType } from "../types/topic";
import { NewTagButton } from "./new-tag-button";
import Link from "next/link";

type Props = {
  topics: TopicType[];
  tags: TopicType[];
  tag: string;
};

const FilterBar = ({ tag, tags, topics }: Props) => {
  return (
    <div className="hidden lg:flex items-center space-x-6 border-b-[1px] text-sm opacity-60 ">
      <NewTagButton topics={topics} tags={tags} />
      <Link
        href="/"
        className={`pb-3 whitespace-nowrap ${
          tag === null ? "border-b-[1px] border-neutral-950" : ""
        }`}>
        For you
      </Link>
      <div className="overflow-x-auto flex gap-6 whitespace-nowrap">
        {tags.map((item, index) => (
          <Link
            key={index}
            href={`/?tag=${item.value}`}
            className={`pb-3 ${
              item.value === `${tag}` ? "border-b-[1px] border-neutral-950" : ""
            }`}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
