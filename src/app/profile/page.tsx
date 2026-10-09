"use client";

import { authClient } from "@/lib/auth-client";
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
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            আপনি সাইন ইন করেননি
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            আপনার প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
          </p>

          <a
            href="/sign-in"
            className="mt-5 inline-flex rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700"
          >
            সাইন ইন
          </a>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setName(user.name || "");
    setIsEditing(true);
  };

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

    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    window.location.href = "/";
  };

  return (
    <div className="min-h-[75vh] bg-gray-50 px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য
          </p>
        </div>

        {/* Profile Summary Card */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Profile Image */}
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "প্রোফাইল ছবি"}
                className="h-14 w-14 shrink-0 rounded-full object-cover sm:h-16 sm:w-16"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-700 sm:h-16 sm:w-16">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            {/* Name and Email */}
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-base font-bold text-gray-900 sm:text-lg">
                {user.name || "ব্যবহারকারী"}
              </h2>

              <p className="mt-1 break-all text-xs text-gray-500 sm:text-sm">
                {user.email}
              </p>
            </div>

            {/* Arrow and Sign Out */}
            <div className="flex shrink-0 items-center gap-0 rounded-2xl border border-red-500 p-0.5">
              <button
                type="button"
                onClick={handleEdit}
                aria-label="প্রোফাইল সম্পাদনা করুন"
                className="flex h-9 w-9 items-center justify-center rounded-full text-red-500 transition-all duration-200 hover:bg-red-50 hover:text-red-700 active:scale-90"
              >
                <FaArrowTurnDown className="h-4 w-4 rotate-90 transition-transform duration-200" />
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-xl px-3 py-2 text-xs font-bold text-red-500 transition-all duration-200 hover:bg-red-50 hover:text-red-700 active:scale-95 sm:px-4 sm:text-sm"
              >
                সাইন আউট
              </button>
            </div>
          </div>
        </div>

        {/* Information Card */}
        <div className="mt-5 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-lg font-bold text-gray-900">তথ্য</h3>

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
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            {/* Update Button */}
            <div className="mt-5">
              <button
                type="submit"
                disabled={isUpdating}
                className="w-full rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUpdating ? "নাম হালনাগাদ হচ্ছে..." : "নাম হালনাগাদ করুন"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
