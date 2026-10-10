"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaUser } from "react-icons/fa";
import { FaArrowTurnDown } from "react-icons/fa6";
import { toast } from "react-toastify";

const UserInfoPage = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const user = session?.user;
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি।");
      return;
    }

    setIsOpen(false);
    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    router.push("/?auth=signed-out");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative ${isOpen ? "z-[110]" : "z-10"}`}
    >
      {user ? (
        <div>
          {/* Profile Button */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-haspopup="true"
            className={`group flex max-w-full items-center gap-1 rounded-xl p-1.5 transition-all duration-300 sm:gap-2 sm:p-2 ${
              isOpen
                ? "bg-green-50 shadow-sm"
                : "hover:bg-green-50 hover:shadow-sm"
            }`}
          >
            {/* Profile Image */}
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "প্রোফাইল ছবি"}
                width={40}
                height={40}
                className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-green-600 transition-all duration-300 group-hover:scale-105 group-hover:ring-4 group-hover:ring-green-200 sm:h-10 sm:w-10"
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-600 font-bold text-white ring-2 ring-transparent transition-all duration-300 group-hover:scale-105 group-hover:ring-4 group-hover:ring-green-200 sm:h-10 sm:w-10">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <span className="max-w-16 truncate text-xs font-semibold text-gray-800 transition-colors duration-300 group-hover:text-green-700 sm:max-w-36 sm:text-sm">
              {user.name || "ব্যবহারকারী"}
            </span>

            <FaChevronDown
              className={`h-3 w-3 shrink-0 text-gray-500 transition-all duration-300 group-hover:text-green-600 ${
                isOpen ? "rotate-180 text-green-600" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute right-0 top-full z-[120] mt-2 w-64 max-w-[calc(100vw-1.5rem)] origin-top-right overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl transition-all duration-200 ease-out ${
              isOpen
                ? "visible translate-y-0 scale-100 opacity-100"
                : "invisible -translate-y-2 scale-95 opacity-0"
            }`}
            aria-hidden={!isOpen}
          >
            {/* User Details */}
            <div className="group/details border-b border-gray-100 bg-gray-50 px-4 py-4 transition-colors duration-300 hover:bg-green-50">
              <div className="flex items-center gap-3">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "প্রোফাইল ছবি"}
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-green-500 transition-transform duration-300 group-hover/details:scale-105"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 font-bold text-white transition-transform duration-300 group-hover/details:scale-105">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-800">
                    {user.name || "ব্যবহারকারী"}
                  </p>
                  <p className="mt-1 break-all text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* My Profile */}
            <Link
              href="/profile"
              tabIndex={isOpen ? 0 : -1}
              onClick={() => setIsOpen(false)}
              className="group flex items-center gap-3 border-b border-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-green-50 hover:pl-6 hover:text-green-700 focus-visible:bg-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-500"
            >
              <FaUser className="h-4 w-4 shrink-0 text-gray-400 transition-all duration-200 group-hover:scale-110 group-hover:text-green-600" />
              <span>আমার প্রোফাইল</span>
            </Link>

            {/* Sign Out */}
            <button
              type="button"
              tabIndex={isOpen ? 0 : -1}
              onClick={handleSignOut}
              className="group/signout flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-50 hover:pl-6 hover:text-red-700 focus-visible:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red-500"
            >
              <FaArrowTurnDown className="h-4 w-4 shrink-0 rotate-90 transition-transform duration-200 group-hover/signout:translate-x-1" />
              <span>সাইন আউট</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/signin"
            className="btn btn-sm border-0 bg-white px-2 text-xs text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-50 hover:text-green-700 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 sm:btn-md sm:px-4 sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="btn btn-sm border-green-600 bg-green-600 px-2 text-xs text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-green-700 hover:bg-green-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 sm:btn-md sm:px-4 sm:text-sm"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfoPage;
