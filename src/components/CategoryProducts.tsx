import { IProduct } from "@/type/Type";
import CategorySort from "./CategorySort";

interface CategoryProductsProps {
  category: string;
}

const CategoryProducts = async ({ category }: CategoryProductsProps) => {
  "use cache";

  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/categories/${category}`,
  );

  const data: IProduct[] = await res.json();

  const categoryName = data[0]?.categoryNameBn || category;
  const categoryIcon = data[0]?.categoryIcon || "🛒";
  const productCount = data.length;

  return (
    <section className="mx-auto mt-10 w-full max-w-7xl">
      {/* Category Header */}
      <div className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg sm:p-6">
        <div className="flex items-center gap-4">
          {/* Category Image */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-4xl transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:border-green-300 group-hover:bg-green-50">
            {categoryIcon}
          </div>

          {/* Category Information */}
          <div>
            <h1 className="inline-block text-2xl font-bold text-gray-900 transition-all duration-300 hover:translate-x-1 hover:text-green-600 sm:text-3xl">
              {categoryName}
            </h1>

            <p className="mt-1 text-sm text-gray-500 transition-colors duration-300 hover:text-green-700 sm:text-base">
              <span className="inline-block font-semibold text-gray-700 transition-all duration-300 hover:scale-110 hover:text-green-600">
                {productCount.toLocaleString("bn-BD")}
              </span>{" "}
              <span className="transition-colors duration-300 hover:text-green-600">
                টি পণ্যের আজকের দাম ও পরিবর্তন
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Sort + Products */}
      <div className="mt-2">
        <CategorySort products={data} />
      </div>
    </section>
  );
};

export default CategoryProducts;
