"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { homeNavigationLinks } from "../data/home-navigation-links";
import { SignInButton } from "../buttons/signin-button";

const MobileMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {homeNavigationLinks.map((item) => (
          <DropdownMenuItem key={item.label} asChild>
            <Link href={item.href}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full" asChild>
          <SignInButton mode="modal" asChild>
            <Button size="sm" className="w-full">
              Sign in
            </Button>
          </SignInButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MobileMenu;
