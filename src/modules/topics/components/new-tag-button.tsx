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
import { useEffect, useState, useTransition } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Spinner from "@/components/spinner";
import { createTopic, getStoriesByTag } from "../actions/topics";
import { Story } from "@prisma/client";
import { Plus } from "lucide-react";
import { TopicType } from "../types/topic";

type Props = {
  topics: TopicType[];
  tags: TopicType[];
};

export const NewTagButton = ({ topics, tags }: Props) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<TopicType[]>(tags);

  const [isPending, startTransition] = useTransition();

  const onPublish = () => {
    startTransition(async () => {
      const response = await createTopic(selectedTopics);
      if (response) {
        toast.success("Story published successfully");
        // router.push(`/my-stories`);
        window.location.reload();
      } else {
        toast.error("Failed to publish story");
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="pb-3">
        <span>
          <Plus size={20} />
        </span>
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
            defaultValue={tags}
            onChange={(selectedValues) => {
              const values = selectedValues as TopicType[];

              const stringValues = values.map((value) => value.value);

              setSelectedTopics(stringValues);
            }}
            // isOptionDisabled={() => selectedTopics?.length >= 5}
            name="topics"
          />
        </div>
        <DialogFooter>
          <Button onClick={() => onPublish()} className="w-24">
            <Spinner isPending={isPending} label="Add tags" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
