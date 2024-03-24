"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";

type Props = {
  image: string;
  name: string;
  date?: string;
  read?: string;
  children?: React.ReactNode;
};

const Author = ({ image, name, date, read, children }: Props) => {
  return (
    <div className="py-4 flex items-center gap-4">
      <div className="">
        <Avatar className="w-11 h-11">
          <AvatarImage src={image || ""} />
          <AvatarFallback className=" bg-stone-200 dark:bg-stone-600">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="">{name}</span>{" "}
          <div className="">{children && <div> -{children}</div>}</div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="">{date}</span>
          <span className="">{read}</span>
        </div>
      </div>
    </div>
  );
};

export default Author;
