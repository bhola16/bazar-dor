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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  // Email Sign Up
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting || socialLoading) return;

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const image = String(formData.get("image") ?? "");
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না।");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        image,
        email,
        password,
        callbackURL: "/?auth=success",
      });

      if (error) {
        toast.error(error.message || "সাইন আপ করা যায়নি।");
        return;
      }

      // ToastProvider displays the success toast after navigation.
      router.push("/?auth=signup-success");
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google and GitHub Sign Up
  const handleSocialSignUp = async (provider: "google" | "github") => {
    if (isSubmitting || socialLoading) return;

    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/?auth=success",
      });

      if (error) {
        toast.error(
          error.message ||
            `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন আপ করা যায়নি।`,
        );
        setSocialLoading(null);
      }
    } catch {
      toast.error("সাইন আপ করা যায়নি। আবার চেষ্টা করুন।");
      setSocialLoading(null);
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
        <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-green-200 hover:shadow-lg sm:p-8">
          <form onSubmit={handleOnSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="signup-name"
                className="text-sm font-semibold text-gray-800"
              >
                নাম
              </label>

              <input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="আপনার পুরো নাম লিখুন"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="signup-email"
                className="text-sm font-semibold text-gray-800"
              >
                ইমেইল
              </label>

              <input
                id="signup-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="আপনার ইমেইল ঠিকানা লিখুন"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="text-sm font-semibold text-gray-800"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                minLength={8}
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="signup-confirm-password"
                className="text-sm font-semibold text-gray-800"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <input
                id="signup-confirm-password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="আবার লিখুন"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-300 placeholder:text-gray-400 hover:border-green-300 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                minLength={8}
                required
              />
            </div>

            {/* Show Password */}
            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 transition-colors hover:text-green-700">
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
              disabled={isSubmitting || socialLoading !== null}
              className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {isSubmitting
                ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </form>

          {/* Or Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-400">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Sign Up Buttons */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={() => handleSocialSignUp("google")}
              type="button"
              disabled={isSubmitting || socialLoading !== null}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Image src="/google.jpeg" alt="Google" width={20} height={20} />
              <span className="whitespace-nowrap">
                {socialLoading === "google"
                  ? "সংযোগ হচ্ছে..."
                  : "Google দিয়ে চালিয়ে যান"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignUp("github")}
              disabled={isSubmitting || socialLoading !== null}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Image src="/github.jpeg" alt="GitHub" width={20} height={20} />
              <span className="whitespace-nowrap">
                {socialLoading === "github"
                  ? "সংযোগ হচ্ছে..."
                  : "GitHub দিয়ে চালিয়ে যান"}
              </span>
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-green-700 transition-colors hover:text-green-800 hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 text-sm font-medium text-gray-500 transition-all duration-300 hover:-translate-x-1 hover:text-green-700"
        >
          <span aria-hidden="true">←</span>
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
