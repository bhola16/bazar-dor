import Link from "next/link";
import { FaHouse, FaMagnifyingGlass } from "react-icons/fa6";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg text-center">
        {/* 404 Illustration */}
        <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-green-100/70" />

          <div className="relative flex h-36 w-36 items-center justify-center rounded-3xl border border-green-100 bg-white shadow-sm">
            <FaMagnifyingGlass className="absolute right-4 top-4 h-7 w-7 rotate-12 text-green-600" />

            <span className="text-5xl font-extrabold tracking-tight text-green-600">
              404
            </span>
          </div>

          <span className="absolute bottom-3 left-3 h-4 w-4 rounded-full bg-green-500" />
          <span className="absolute right-2 top-8 h-3 w-3 rounded-full bg-green-300" />
        </div>

        {/* Message */}
        <div className="mt-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-green-600">
            Page Not Found
          </p>

          <h1 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            দুঃখিত! পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
            আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে, নাম পরিবর্তন করা হয়েছে
            অথবা ঠিকানাটি ভুল হয়েছে।
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-100"
          >
            <FaHouse className="h-4 w-4" />
            হোম পেজে ফিরুন
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-gray-200 pt-5">
          <p className="text-sm text-gray-400">
            বাজার দর — প্রতিদিনের বাজারদর, আপনার হাতেই।
          </p>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
