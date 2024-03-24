"use client";

import { LinkedinShareButton } from "next-share";
import { SiLinkedin } from "react-icons/si";

type Props = {
  url: string;
  quote?: string;
};

const ShareLinkedIn = ({ url, quote }: Props) => {
  return (
    <LinkedinShareButton url={url} title={quote}>
      <div className="flex items-center gap-2">
        <SiLinkedin size={18} />
        <span>Share on LinkedIn</span>
      </div>
    </LinkedinShareButton>
  );
};

export default ShareLinkedIn;
