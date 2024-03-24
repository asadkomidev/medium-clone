"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  let [mounted, setMounted] = React.useState(false);
  let otherTheme = resolvedTheme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : "Toggle theme"}
      className="group px-2"
      onClick={() => setTheme(otherTheme)}>
      <Sun strokeWidth={1} className="h-5 w-5 transition dark:hidden" />
      <Moon strokeWidth={1} className="hidden h-5 w-5 transition dark:block " />
    </button>
  );
}
