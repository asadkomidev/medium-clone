"use client";

import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { deleteComment } from "../../actions/comment";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const handleDelete = async () => {
    try {
      // @ts-ignore
      await deleteComment(id);
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error("Error deleting comment");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleDelete}>
          <span className="">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
