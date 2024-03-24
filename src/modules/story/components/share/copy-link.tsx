"use client";

import { Check, CopyIcon, Link } from "lucide-react";
import { useState } from "react";

type Props = {
  url: string;
};

const CopyLink = ({ url }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (urlValue: string) => {
    try {
      await navigator.clipboard.writeText(urlValue);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="">
      <div
        onClick={() => copyToClipboard(url)}
        className="flex items-center gap-2 text-muted-foreground">
        <Link size={18} className="text-muted-foreground" />
        <span className="text-muted-foreground">Copy link</span>
      </div>
    </div>
  );
};

export default CopyLink;
