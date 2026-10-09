"use client";

import { IProduct } from "@/type/Type";
import { useState } from "react";
import ProductCard from "./ProductCard";

interface CategorySortProps {
  products: IProduct[];
}

const CategorySort = ({ products }: CategorySortProps) => {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "higher") {
      return b.today - a.today;
    }

    if (sort === "lower") {
      return a.today - b.today;
    }

    return 0;
  });

  return (
    <>
      {/* Sort Controls */}
      <div className="mt-5 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:border-green-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-semibold text-gray-800 transition-colors duration-300">
            পণ্য সাজান
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            পণ্যের দাম অনুযায়ী সাজিয়ে দেখুন
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="sort"
            className="shrink-0 text-sm font-medium text-gray-700"
          >
            সাজান
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition-all duration-300 hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 sm:w-auto"
          >
            <option value="default">ডিফল্ট</option>
            <option value="lower">কম থেকে বেশি</option>
            <option value="higher">বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {/* Product Count */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-gray-500 sm:text-base">
          মোট{" "}
          <span className="font-bold text-green-700">
            {sortedProducts.length.toLocaleString("bn-BD")}
          </span>{" "}
          টি পণ্য দেখানো হচ্ছে
        </p>

        {sort !== "default" && (
          <button
            type="button"
            onClick={() => setSort("default")}
            className="rounded-lg px-3 py-1.5 text-xs font-medium text-green-700 transition-colors duration-200 hover:bg-green-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            সাজানো মুছুন ×
          </button>
        )}
      </div>

      {/* Products */}
      {sortedProducts.length > 0 ? (
        <div
          key={sort}
          className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-8 text-center transition-all duration-300 hover:border-green-200 hover:shadow-md">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-2xl">
            🛒
          </div>

          <p className="mt-3 font-medium text-gray-700">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>

          <p className="mt-1 text-sm text-gray-500">পরে আবার চেষ্টা করুন।</p>
        </div>
      )}
    </>
  );
};

export default CategorySort;
