
import Image from "next/image";
import DateDisplay from "./DateDisplay";

const Banner = () => {
  return (
    <section className="mx-auto pb-8  mt-10 max-w-7xl rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
      {/* Date */}
      <div className="inline-block rounded-2xl bg-green-100/50 px-4 py-3 font-bold text-green-600">
        <DateDisplay />
      </div>

      {/* Hero Content */}
      <div className="mt-2 flex items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <button className="mt-6 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700">
            সব পণ্য দেখুন
          </button>
        </div>

        <div className="hidden shrink-0 sm:block">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্য"
            width={300}
            height={300}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
