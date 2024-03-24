"use client";

import CreatableSelect from "react-select/creatable";

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
import { useState, useTransition } from "react";
import { publishStory } from "../../actions/story";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Spinner from "@/components/spinner";

type Props = {
  storyId: string;
  publish: boolean | undefined;
};

const topics = [
  { value: "Artificial Intelligence", label: "Artificial Intelligence" },
  { value: "Python", label: "Python" },
  { value: "Programming", label: "Programming" },
  { value: "Fashion", label: "Fashion" },
  { value: "World", label: "World" },
  { value: "Politics", label: "Politics" },
];

export const PublishButton = ({ storyId, publish }: Props) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onPublish = () => {
    startTransition(async () => {
      if (selectedTopics.length < 1) {
        toast.error("Please select at least one topic");
        return;
      }
      const response = await publishStory(storyId, selectedTopics);
      if (response) {
        toast.success("Story published successfully");
        router.push(`/my-stories`);
      } else {
        toast.error("Failed to publish story");
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"}>{publish ? "Published" : "Publish"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Publish</DialogTitle>
          <DialogDescription>
            Before publishing, add at least 5 topics to your story to help
            readers find it
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <CreatableSelect
            isMulti
            options={topics}
            onChange={(selectedValues) => {
              const values = selectedValues as {
                value: string;
                label: string;
              }[];

              const stringValues = values.map((value) => value.value);

              setSelectedTopics(stringValues);
            }}
            isOptionDisabled={() => selectedTopics?.length >= 5}
            name="topics"
          />
        </div>
        <DialogFooter>
          <Button onClick={() => onPublish()} className="w-24">
            <Spinner isPending={isPending} label="Publish" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
