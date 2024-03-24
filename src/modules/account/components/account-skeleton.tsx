import { Skeleton } from "@/components/ui/skeleton";

export const AccountSkeleton = () => {
  return (
    <div className="flex items-center space-x-4  w-full">
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-[100px]" />
            <Skeleton className="h-6 w-[250px]" />
          </div>
          <Skeleton className="h-0.5 w-full" />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-[120px]" />
            <Skeleton className="h-6 w-[100px]" />
          </div>
          <Skeleton className="h-0.5 w-full" />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-[110px]" />
            <Skeleton className="h-6 w-[200px]" />
          </div>
          <Skeleton className="h-0.5 w-full" />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-[110px]" />
            <Skeleton className="h-6 w-[80px]" />
          </div>
          <Skeleton className="h-0.5 w-full" />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-[210px]" />
            <Skeleton className="h-6 w-[60px]" />
          </div>
          <Skeleton className="h-0.5 w-full" />
        </div>
      </div>
    </div>
  );
};
