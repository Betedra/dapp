"use client";

import LeaderboardIcon from "@/components/custom_icons/LeaderboardIcon";
import Link from "next/link";
import React from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

export const Header = () => {
  return (
    <header className="flex items-center space-x-4">
      <Link
        href="/"
        title="Predictions"
        className="bg-transparent border text-white border-tuna hover:bg-slate-900/90 rounded-md p-4"
      >
        <MdKeyboardArrowLeft size={16} />
      </Link>
      <span className="flex items-center text-lg lg:text-2xl font-medium text-gray-25 space-x-3">
        <LeaderboardIcon />
        <span>Leaderboard</span>
      </span>
    </header>
  );
};
