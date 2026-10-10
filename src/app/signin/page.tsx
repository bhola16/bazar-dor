"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  // Email Sign In
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading || socialLoading) return;

    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const email = String(formData.get("email") ?? "").trim();
      const password = String(formData.get("password") ?? "");

      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি।");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");

      router.replace("/");
    } catch (error) {
      console.error("Email sign-in error:", error);
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  // Google and GitHub Sign In
  const handleSocialSignIn = async (provider: "google" | "github") => {
    if (isLoading || socialLoading) return;

    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: `${window.location.origin}/?auth=success`,
      });

      if (error) {
        toast.error(
          error.message ||
            `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন করা যায়নি।`,
        );

        setSocialLoading(null);
      }
    } catch (error) {
      console.error(`${provider} sign-in error:`, error);
      toast.error("সাইন ইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setSocialLoading(null);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-50 px-4 py-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            সাইন ইন
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে আপনার অ্যাকাউন্টে প্রবেশ
            করুন।
          </p>
        </div>

        <div className="w-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleOnSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-800"
              >
                ইমেইল
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="আপনার ইমেইল ঠিকানা লিখুন"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-800"
              >
                পাসওয়ার্ড
              </label>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                required
              />
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 transition-colors hover:text-green-700">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className="h-4 w-4 accent-green-700"
              />
              পাসওয়ার্ড দেখান
            </label>

            <button
              type="submit"
              disabled={isLoading || socialLoading !== null}
              className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-sm text-gray-400">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={isLoading || socialLoading !== null}
              onClick={() => handleSocialSignIn("google")}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
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
              disabled={isLoading || socialLoading !== null}
              onClick={() => handleSocialSignIn("github")}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Image src="/github.jpeg" alt="GitHub" width={20} height={20} />

              <span className="whitespace-nowrap">
                {socialLoading === "github"
                  ? "সংযোগ হচ্ছে..."
                  : "GitHub দিয়ে চালিয়ে যান"}
              </span>
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-green-700 hover:text-green-800 hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

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
