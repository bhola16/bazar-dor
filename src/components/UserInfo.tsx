"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaUser } from "react-icons/fa";
import { FaArrowTurnDown } from "react-icons/fa6";
import { toast } from "react-toastify";

const UserInfoPage = () => {
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);

  const user = session?.user;

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি।");
      return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    window.location.href = "/";
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {user ? (
        <div>
          {/* Profile Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className="flex items-center gap-2 rounded-xl p-2 transition hover:bg-green-50"
          >
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "প্রোফাইল ছবি"}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-green-600"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-bold text-white">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <span className="max-w-28 truncate text-sm font-semibold text-gray-800 sm:max-w-36">
              {user.name || "ব্যবহারকারী"}
            </span>

            <FaChevronDown
              className={`h-3 w-3 text-gray-500 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
              {/* User Details */}
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {user.name || "ব্যবহারকারী"}
                </p>

                <p className="mt-1 break-all text-xs text-gray-400">
                  {user.email}
                </p>
              </div>

              {/* My Profile */}
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
              >
                <FaUser className="h-4 w-4" />
                আমার প্রোফাইল
              </Link>

              {/* Sign Out */}
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center text-red-500 gap-3 px-4 py-3 text-md font-medium transition hover:bg-green-50 "
              >
                <FaArrowTurnDown className="h-4 w-4 rotate-90" />
                সাইন আউট
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <Link
            href="/signin"
            className="btn btn-md border-0 bg-white text-md text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-50 hover:text-green-700"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="btn btn-md border-green-600 bg-green-600 text-md text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-green-700 hover:bg-green-700 hover:shadow-md"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfoPage;
