"use client";

import { TwitterShareButton } from "next-share";
import { FaXTwitter } from "react-icons/fa6";

type Props = {
  url: string;
  quote?: string;
};

const ShareX = ({ url, quote }: Props) => {
  return (
    <TwitterShareButton url={url} title={quote}>
      <div className="flex items-center gap-2">
        <FaXTwitter size={18} />
        <span>Share on X</span>
      </div>
    </TwitterShareButton>
  );
};

export default ShareX;
