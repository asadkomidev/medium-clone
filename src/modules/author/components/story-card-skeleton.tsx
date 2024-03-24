import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const StoryCardSkeleton = () => {
  return (
    <div className="flex items-center space-x-4  w-full">
      <div className="flex flex-col space-y-6 w-full">
        <div className="space-y-2">
          <Skeleton className="h-[200px] w-full" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-[16px] w-[100px]" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-[20px] w-full" />
          <Skeleton className="h-[20px] w-[200px]" />
          <Skeleton className="h-[20px] w-[150px]" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-[16px] w-[100px]" />
            <Skeleton className="h-[16px] w-[100px]" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-6" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
