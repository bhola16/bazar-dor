"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navlinks from "./Navlinks";

const Header = () => {
  const [date] = useState(() =>
    new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    }),
  );

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 shadow-sm">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={30}
              height={30}
              className="object-contain"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              বাজার দর
            </h2>

            <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">{date}</p>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/signin"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-green-600 sm:px-4"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 hover:shadow-md sm:px-5"
          >
            সাইন আপ
          </Link>
        </div>
      </div>
      <Navlinks />
    </header>
  );
};

export default Header;
