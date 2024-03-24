import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const StoryCardSkeleton = () => {
  return (
    <div className="flex items-center space-x-4  w-full">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex items-center gap-6 w-full">
          {/* Content */}
          <div className="basis-full">
            <div className="space-y-2">
              <div className="flex items-center gap-2 pb-2">
                <Skeleton className="h-[10px] w-[200px]" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-[20px] w-full" />
              <Skeleton className="h-[20px] w-48" />
              <Skeleton className="h-[10px] w-96" />
              <Skeleton className="h-[10px] w-full" />
            </div>
            <div className="flex items-center justify-between pt-4">
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
          {/* Image */}
          <div className="">
            <Skeleton className="h-[150px] w-[150px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
