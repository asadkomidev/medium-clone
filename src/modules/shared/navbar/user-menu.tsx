"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

import { homeNavigationLinks } from "../data/home-navigation-links";
import { LogOut } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { SignOutButton } from "../buttons/signout-button";

const UserMenu = () => {
  const router = useRouter();
  const user = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className=" bg-stone-200 dark:bg-stone-600">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Link href="/my-stories">Dashboard</Link>
        </DropdownMenuItem>

        {homeNavigationLinks.map((item) => (
          <DropdownMenuItem key={item.id} asChild>
            <Link href={item.href}>{item.label}</Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <SignOutButton>
          <DropdownMenuItem>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
