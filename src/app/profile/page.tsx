"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";
import { FaArrowTurnDown } from "react-icons/fa6";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  if (isPending) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-green-600" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <h2 className="text-xl font-bold text-gray-900">
            আপনি সাইন ইন করেননি
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            আপনার প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
          </p>

          <a
            href="/signin"
            className="mt-5 inline-flex rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          >
            সাইন ইন
          </a>
        </div>
      </div>
    );
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না।");
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করা যায়নি।");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে।");
      setIsEditing(false);
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি।");
      return;
    }

    window.location.href = "/?auth=signed-out";
  };

  return (
    <div className="min-h-[75vh] bg-gray-50 px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-900 transition-colors duration-300 hover:text-green-700 sm:text-3xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য
          </p>
        </div>

        {/* Profile Summary Card */}
        <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg sm:p-6">
          <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap sm:gap-5">
            {/* Profile Image */}
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "প্রোফাইল ছবি"}
                width={64}
                height={64}
                className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-transparent transition-all duration-300 group-hover:scale-105 group-hover:ring-4 group-hover:ring-green-100 sm:h-16 sm:w-16"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700 ring-2 ring-transparent transition-all duration-300 group-hover:scale-105 group-hover:bg-green-600 group-hover:text-white group-hover:ring-4 group-hover:ring-green-100 sm:h-16 sm:w-16">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            {/* Name and Email */}
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-700 sm:text-lg">
                {user.name || "ব্যবহারকারী"}
              </h2>

              <p className="mt-1 break-all text-xs text-gray-500 sm:text-sm">
                {user.email}
              </p>
            </div>

            {/* Sign Out */}
            <button
              type="button"
              onClick={handleSignOut}
              className="group/signout flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-600 hover:bg-red-600 hover:text-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 sm:px-4"
            >
              <FaArrowTurnDown className="h-4 w-4 rotate-90 transition-transform duration-300 group-hover/signout:translate-x-1" />
              <span>সাইন আউট</span>
            </button>
          </div>
        </div>

        {/* Information Card */}
        <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-green-200 hover:shadow-lg sm:p-6">
          <h3 className="text-lg font-bold text-gray-900 transition-colors duration-300 hover:text-green-700">
            তথ্য
          </h3>

          <form onSubmit={handleUpdate} className="mt-5">
            <label
              htmlFor="profile-name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={name || (isEditing ? "" : user.name || "")}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => {
                if (!isEditing) {
                  setName(user.name || "");
                  setIsEditing(true);
                }
              }}
              placeholder="আপনার নাম লিখুন"
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-300 focus:border-green-600 focus:ring-4 focus:ring-green-100"
            />

            {/* Update Button */}
            <div className="mt-5">
              <button
                type="submit"
                disabled={isUpdating}
                className="w-full rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {isUpdating ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm" />
                    নাম হালনাগাদ হচ্ছে...
                  </span>
                ) : (
                  "নাম হালনাগাদ করুন"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
