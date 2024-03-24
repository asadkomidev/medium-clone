"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Share2 } from "lucide-react";

import ShareX from "./share-x";
import ShareLinkedIn from "./share-linkedin";
import CopyLink from "./copy-link";
import { Button } from "@/components/ui/button";
import { ShareIcon } from "@/modules/shared/icons/share-icon";

type Props = {
  url: string;
  quote?: string;
};

const ShareButtons = ({ url, quote }: Props) => {
  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger className="flex items-center ">
              <ShareIcon />
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent align="end">
            <p>Share</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align="end" className="mt-1 text-muted-foreground">
        <DropdownMenuItem>
          <CopyLink url={url} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ShareX url={url} quote={quote} />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ShareLinkedIn url={url} quote={quote} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ShareButtons;
