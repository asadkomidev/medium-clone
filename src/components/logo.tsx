"use client";

import { Bird } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      className="gap-2 text-xl md:text-2xl cursor-pointer"
      onClick={() => router.push("/")}>
      <div className="flex items-center gap-2">
        <Bird strokeWidth={1} className="dark:text-white" />
        <span className="font-bold dark:text-white ">acme.</span>
      </div>
    </div>
  );
};

export default Logo;
