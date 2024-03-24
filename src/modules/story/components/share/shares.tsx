"use client";

import { ShareIcon } from "@/modules/shared/icons/share-icon";
import ShareButtons from "./share-buttons";

type Props = {
  url: string;
  quote?: string;
};

export const Shares = ({ url, quote }: Props) => {
  return (
    <div>
      <ShareButtons url={url} quote={quote} />
    </div>
  );
};
