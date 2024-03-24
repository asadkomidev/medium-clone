"use client";

import { Loader2 } from "lucide-react";

type Props = {
  isPending?: boolean;
  label?: string;
};

const Spinner = ({ isPending, label }: Props) => {
  return (
    <span>
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <span>{label}</span>
      )}
    </span>
  );
};

export default Spinner;
