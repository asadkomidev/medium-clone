"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SquarePen } from "lucide-react";

import { createStory } from "../actions/story";

export const CreateStoryButton = () => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = () => {
    startTransition(async () => {
      const response = await createStory();
      if (!response) {
        toast.error("Failed to create story");
        return;
      }
      if ("id" in response) {
        router.push(`/story/${response.id}`);
        toast.success("Story created successfully");
        setOpen(false);
      } else {
        toast.error("Failed to create story");
      }
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-x-2 text-muted-foreground mx-6 cursor-pointer">
          <SquarePen size={20} className=" " />
          <span className="text-sm">Write</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new story</DialogTitle>
          <DialogDescription>
            Write a new story and share it with your friends and followers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={onSubmit}
            disabled={isPending}
            type="button"
            className="w-full">
            <Spinner isPending={isPending} label="Create" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
