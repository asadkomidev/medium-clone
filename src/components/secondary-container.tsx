import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function SecondaryContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto max-w-3xl ", className)}>{children}</div>;
}
