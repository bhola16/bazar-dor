"use client";

import { IMarket } from "@/type/Type";
import { useState } from "react";

interface MarketPriceTableProps {
  markets: IMarket[];
}

const MarketPriceTable = ({ markets }: MarketPriceTableProps) => {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);

  return (
    <section className="mt-8">
      {/* Heading */}
      <h2 className="inline-block text-xl font-bold text-gray-900 transition-all duration-300 hover:translate-x-1 hover:text-green-600 sm:text-2xl">
        বাজারভিত্তিক আজকের দাম
      </h2>

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200 transition-all duration-300 hover:border-green-200 hover:shadow-md">
        <table className="w-full min-w-[650px] border-collapse text-left">
          <thead className="bg-white text-md text-black">
            <tr className="border-b-2 border-zinc-200">
              <th className="px-5 py-4 font-bold transition-colors duration-300 hover:bg-green-50 hover:text-green-700">
                বাজার
              </th>
              <th className="px-5 py-4 font-bold transition-colors duration-300 hover:bg-green-50 hover:text-green-700">
                বিভাগ
              </th>
              <th className="px-5 py-4 font-bold transition-colors duration-300 hover:bg-green-50 hover:text-green-700">
                সর্বনিম্ন
              </th>
              <th className="px-5 py-4 font-bold transition-colors duration-300 hover:bg-green-50 hover:text-green-700">
                সর্বাধিক
              </th>
              <th className="px-5 py-4 font-bold transition-colors duration-300 hover:bg-green-50 hover:text-green-700">
                গড়
              </th>
            </tr>
          </thead>

          <tbody>
            {markets.length > 0 ? (
              markets.map((market, index) => {
                const average = Math.round((market.min + market.max) / 2);
                const marketKey = `${market.market}-${market.division}-${index}`;
                const isSelected = selectedMarket === marketKey;

                return (
                  <tr
                    key={marketKey}
                    onClick={() =>
                      setSelectedMarket(isSelected ? null : marketKey)
                    }
                    aria-selected={isSelected}
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedMarket(isSelected ? null : marketKey);
                      }
                    }}
                    className={`cursor-pointer border-b-3 border-zinc-400 text-md text-black transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-green-600 ${
                      isSelected
                        ? "bg-green-300 shadow-inner"
                        : index % 2 === 1
                          ? "bg-green-50 hover:bg-green-100"
                          : "bg-white hover:bg-green-50"
                    }`}
                  >
                    {/* Market */}
                    <td className="px-5 py-4 font-medium transition-colors duration-200 hover:text-green-700">
                      {market.market}
                    </td>

                    {/* Division */}
                    <td className="px-5 py-4 transition-colors duration-200 hover:text-green-700">
                      {market.division}
                    </td>

                    {/* Minimum Price */}
                    <td className="px-5 py-4 transition-colors duration-200 hover:text-green-700">
                      <span className="inline-block transition-transform duration-200 hover:scale-105 hover:font-semibold">
                        {market.min.toLocaleString("bn-BD")}
                      </span>{" "}
                      <span className="text-gray-500 transition-colors duration-200 hover:text-green-700">
                        টাকা
                      </span>
                    </td>

                    {/* Maximum Price */}
                    <td className="px-5 py-4 transition-colors duration-200 hover:text-red-600">
                      <span className="inline-block transition-transform duration-200 hover:scale-105 hover:font-semibold">
                        {market.max.toLocaleString("bn-BD")}
                      </span>{" "}
                      <span className="text-gray-500 transition-colors duration-200 hover:text-red-600">
                        টাকা
                      </span>
                    </td>

                    {/* Average Price */}
                    <td className="px-5 py-4 transition-colors duration-200 hover:text-green-700">
                      <span className="inline-block transition-transform duration-200 hover:scale-105 hover:font-semibold">
                        {average.toLocaleString("bn-BD")}
                      </span>{" "}
                      <span className="text-gray-500 transition-colors duration-200 hover:text-green-700">
                        টাকা
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="border-b-2 border-gray-300 bg-white">
                <td
                  colSpan={5}
                  className="px-5 py-8 text-center text-gray-600 transition-colors duration-300 hover:bg-green-50 hover:text-green-700"
                >
                  এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Selected Market */}
      {selectedMarket !== null && (
        <p
          className="mt-3 rounded-lg bg-green-50 px-4 py-3 text-sm text-gray-600 transition-all duration-300 hover:bg-green-100 hover:text-green-800"
          aria-live="polite"
        >
          <span className="font-semibold text-green-700 transition-colors duration-300 hover:text-green-900">
            নির্বাচিত বাজার:
          </span>{" "}
          {
            markets.find(
              (market, index) =>
                `${market.market}-${market.division}-${index}` ===
                selectedMarket,
            )?.market
          }
          
        </p>
      )}
    </section>
  );
};

export default MarketPriceTable;
