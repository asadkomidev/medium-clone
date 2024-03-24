"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NewTagButton } from "./new-tag-button";
import { TopicType } from "../types/topic";

type Props = {
  topics: TopicType[];
  tags: TopicType[];
  tag: string;
};

const FilterMobile = ({ tag, tags, topics }: Props) => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <SlidersHorizontal size={20} className="text-muted-foreground" />
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader className="text-start mt-8">
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>
        <div className="flex  flex-col  text-sm opacity-60 text-start gap-2 py-6">
          <NewTagButton topics={topics} tags={tags} />
          <Link
            href="/"
            className={`pb-3 ${
              tag === null ? "border-b-[1px] border-neutral-950" : ""
            }`}>
            For you
          </Link>
          {tags.map((item, index) => (
            <Link
              key={index}
              href={`/?tag=${item.value}`}
              className={`pb-3 ${
                item.value === `${tag}`
                  ? "border-b-[1px] border-neutral-950"
                  : ""
              }`}>
              {item.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterMobile;
