"use client";

import { useState } from "react";

interface IMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface MarketPriceTableProps {
  markets: IMarket[];
}

const MarketPriceTable = ({ markets }: MarketPriceTableProps) => {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
        বাজারভিত্তিক আজকের দাম
      </h2>

      <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full min-w-[650px] border-collapse text-left">
          <thead className="bg-white text-md text-black">
            <tr className="border-b-2 border-zinc-200">
              <th className="px-5 py-4 font-bold">বাজার</th>
              <th className="px-5 py-4 font-bold">বিভাগ</th>
              <th className="px-5 py-4 font-bold">সর্বনিম্ন</th>
              <th className="px-5 py-4 font-bold">সর্বাধিক</th>
              <th className="px-5 py-4 font-bold">গড়</th>
            </tr>
          </thead>

          <tbody>
            {markets.length > 0 ? (
              markets.map((market, index) => {
                const average = Math.round((market.min + market.max) / 2);
                const isSelected =
                  selectedMarket ===
                  `${market.market}-${market.division}-${index}`;

                return (
                  <tr
                    key={`${market.market}-${market.division}-${index}`}
                    onClick={() =>
                      setSelectedMarket(
                        isSelected
                          ? null
                          : `${market.market}-${market.division}-${index}`,
                      )
                    }
                    aria-selected={isSelected}
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedMarket(
                          isSelected
                            ? null
                            : `${market.market}-${market.division}-${index}`,
                        );
                      }
                    }}
                    className={`cursor-pointer border-b-2 border-black text-md text-black transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-green-600 ${
                      isSelected
                        ? "bg-green-200"
                        : index % 2 === 1
                          ? "bg-green-50 hover:bg-green-100"
                          : "bg-white hover:bg-green-50"
                    }`}
                  >
                    <td className="px-5 py-4 font-medium">{market.market}</td>

                    <td className="px-5 py-4">{market.division}</td>

                    <td className="px-5 py-4">
                      {market.min.toLocaleString("bn-BD")} টাকা
                    </td>

                    <td className="px-5 py-4">
                      {market.max.toLocaleString("bn-BD")} টাকা
                    </td>

                    <td className="px-5 py-4">
                      {average.toLocaleString("bn-BD")} টাকা
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="border-b-2 border-gray-300 bg-white">
                <td colSpan={5} className="px-5 py-8 text-center text-gray-600">
                  এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedMarket !== null && (
        <p className="mt-3 text-sm text-gray-600" aria-live="polite">
          <span className="font-semibold text-green-700">নির্বাচিত বাজার:</span>{" "}
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
