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
      {/* Sort */}
      <div className="mt-5 flex justify-end rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition-shadow duration-300 hover:shadow-md">
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort"
            className="text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-green-600"
          >
            সাজান
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition-all duration-300 hover:border-green-400 hover:text-green-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-100"
          >
            <option value="default">ডিফল্ট</option>
            <option value="higher">বেশি দাম</option>
            <option value="lower">কম দাম</option>
          </select>
        </div>
      </div>

      {/* Product Count */}
      <p className="mt-5 text-lg text-gray-500 transition-colors duration-300 hover:text-green-700">
        মোট{" "}
        <span className="inline-block font-semibold text-gray-700 transition-colors duration-300 hover:text-green-600">
          {products.length.toLocaleString("bn-BD")}
        </span>
        টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Products */}
      {sortedProducts.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-8 text-center transition-all duration-300 hover:border-green-200 hover:shadow-md">
          <p className="text-gray-500 transition-colors duration-300 hover:text-green-700">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </>
  );
};

export default CategorySort;
