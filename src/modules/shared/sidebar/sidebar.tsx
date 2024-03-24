"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  accountNavigationLinks,
  dashboardNavigationLinks,
} from "../data/account-navigation-links";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex w-56 space-x-2 border-r md:flex-col lg:space-x-0 lg:space-y-1 px-4 md:justify-between sm:min-h-[80vh] fixed">
      <div className="">
        {dashboardNavigationLinks.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "items-start flex flex-col"
            )}>
            <span className="flex gap-2 items-center">
              <item.icon strokeWidth={1} className="w-4 h-4" />
              {item.title}
            </span>
          </Link>
        ))}
      </div>
      <div className="pb-16">
        {accountNavigationLinks.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "items-start flex flex-col"
            )}>
            <span className="flex gap-2 items-center">
              <item.icon strokeWidth={1} className="w-4 h-4" />
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
