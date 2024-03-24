"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { unpublishStory } from "@/modules/story/actions/story";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  id: string;
  publish: boolean | undefined;
};

export function PublishSwitch({ id, publish }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const response = await unpublishStory(id, !!publish); // Fix: Pass a boolean value for the publish parameter
        if (response) {
          toast.success(
            `Story ${publish ? "unpublished" : "published"} successfully`
          );
        } else {
          toast.error(`Failed to ${publish ? "unpublish" : "publish"} story`);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again later.");
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className=" bg-primary text-white dark:bg-secondary  p-1 px-2 rounded-md text-xs cursor-pointer">
          {publish ? "Unpublish" : "Publish"}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {publish ? "Unpublish story" : "Publish story"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to {publish ? "unpublish" : "publish"} this
            story?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
