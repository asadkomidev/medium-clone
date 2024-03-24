import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const SettingsSkeleton = () => {
  return (
    <div className="flex items-center space-x-4  w-full">
      <div className="flex flex-col space-y-6 w-full">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-16 w-full" />
        </div>
        <div className="pt-2">
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
};
