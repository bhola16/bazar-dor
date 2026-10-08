
import { IProduct } from "@/type/Type";
import CategorySort from "./CategorySort";

interface CategoryProductsProps {
  category: string;
}

const CategoryProducts = async ({ category }: CategoryProductsProps) => {
  "use cache";

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${category}`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category products");
  }

  const data: IProduct[] = await res.json();

  const categoryName = data[0]?.categoryNameBn || category;
  const categoryIcon = data[0]?.categoryIcon || "🛒";
  const productCount = data.length;

  return (
    <section className="mx-auto mt-10 w-full max-w-7xl">
      {/* Category Header */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-4">
          {/* Category Image */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-4xl">
            {categoryIcon}
          </div>

          {/* Category Information */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {categoryName}
            </h1>

            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              {productCount.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও
              পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      {/* Sort + Products */}
      <CategorySort products={data} />
    </section>
  );
};

export default CategoryProducts;
