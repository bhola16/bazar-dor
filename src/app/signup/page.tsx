"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "");
    const image = String(formData.get("image") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name,
      image,
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "সাইন আপ করা যায়নি।");
      return;
    }

    if (data) {
      toast.success("সফলভাবে সাইন আপ হয়েছে।");
      router.push("/");
    }
  };

  // Google Sign Up
  const handleGoogleSignUp = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Google sign up failed.");
    }
  };

  // GitHub Sign Up
  const handleGitHubSignUp = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "GitHub sign up failed.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-10">
      <div className="flex w-full max-w-md flex-col gap-5">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            বিনা খরচে সাইন আপ করে বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleOnSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-gray-800">নাম</label>

              <input
                name="name"
                type="text"
                autoComplete="name"
                placeholder="আপনার পুরো নাম লিখুন"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-800">
                ইমেইল
              </label>

              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="আপনার ইমেইল ঠিকানা লিখুন"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-gray-800">
                পাসওয়ার্ড
              </label>

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                minLength={8}
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-semibold text-gray-800">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="আবার লিখুন"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                minLength={8}
                required
              />
            </div>

            {/* Show Password */}
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="h-4 w-4 accent-green-700"
              />
              পাসওয়ার্ড দেখান
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>
          </form>

          {/* Or Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-400">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={handleGoogleSignUp}
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <Image src="/google.jpeg" alt="Google" width={20} height={20} />
              <span className="whitespace-nowrap">Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              onClick={handleGitHubSignUp}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <Image src="/github.jpeg" alt="GitHub" width={20} height={20} />
              <span className="whitespace-nowrap">GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-green-700 hover:text-green-800 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 text-sm font-medium text-gray-500 transition hover:text-green-700"
        >
          <span aria-hidden="true">←</span>
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
