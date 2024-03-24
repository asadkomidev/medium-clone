"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import {
  accountNavigationLinks,
  dashboardNavigationLinks,
} from "../data/account-navigation-links";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";

type Props = {};

const SidebarMobile = (props: Props) => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="text-start mt-8">
          <SheetTitle>Dashboard</SheetTitle>
          <SheetDescription>Manage your account and settings.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-between h-full pt-6 pb-12">
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
