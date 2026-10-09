"use client";

import Image from "next/image";
import DateDisplay from "./DateDisplay";

const Banner = () => {
  const handleScroll = () => {
    document.getElementById("all-products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="mx-auto mt-10 max-w-7xl rounded-2xl border border-gray-200 bg-white px-5 py-4 pb-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Date */}
      <div className="inline-block rounded-2xl bg-green-100/50 px-4 py-3 font-bold text-green-600 transition-all duration-300 hover:bg-green-100 hover:text-green-700">
        <DateDisplay />
      </div>

      {/* Hero Content */}
      <div className="mt-2 flex items-center justify-between gap-8">
        <div className="max-w-2xl">
          {/* Heading */}
          <h1 className="text-3xl font-bold leading-tight text-gray-900 transition-colors duration-300 hover:text-green-700 sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="mt-2 max-w-xl text-sm leading-7 text-gray-600 transition-colors duration-300 hover:text-gray-900 sm:text-base">
            <span className="transition-colors duration-200 hover:text-green-700">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম
            </span>{" "}
            <span className="transition-colors duration-200 hover:text-green-700">
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন
            </span>{" "}
            <span className="transition-colors duration-200 hover:text-green-700">
              এক জায়গায়।
            </span>
          </p>

          {/* Button */}
          <button
            type="button"
            onClick={handleScroll}
            className="mt-6 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-md active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              সব পণ্য দেখুন
            </span>
            <span className="ml-2 inline-block transition-transform duration-300 hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        {/* Hero Image */}
        <div className="hidden shrink-0 sm:block">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্য"
            width={300}
            height={300}
            priority
            className="transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
