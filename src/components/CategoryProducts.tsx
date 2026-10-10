import { INavlinks, IProduct } from "@/type/Type";
import CategorySort from "./CategorySort";

interface CategoryProductsProps {
  category: string;
}

const CategoryProducts = async ({ category }: CategoryProductsProps) => {
  "use cache";

  const [productsRes, categoriesRes] = await Promise.all([
    fetch(
      `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(category)}`,
    ),
    fetch("https://api.abcz.workers.dev/api/bazardor/categories"),
  ]);

  if (!productsRes.ok) {
    throw new Error("Failed to fetch category products");
  }

  if (!categoriesRes.ok) {
    throw new Error("Failed to fetch categories");
  }

  const productsData: unknown = await productsRes.json();
  const categoriesData: unknown = await categoriesRes.json();

  // Ensure the products response is an array.
  const data: IProduct[] = Array.isArray(productsData)
    ? (productsData as IProduct[])
    : [];

  // Ensure the categories response is an array.
  const categories: INavlinks[] = Array.isArray(categoriesData)
    ? (categoriesData as INavlinks[])
    : [];

  const selectedCategory = categories.find((item) => item.slug === category);

  const categoryName =
    data[0]?.categoryNameBn || selectedCategory?.nameBn || category;

  const categoryIcon = data[0]?.categoryIcon || selectedCategory?.icon || "🛒";

  const productCount = data.length;

  return (
    <section className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Category Header */}
      <div className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg sm:p-6">
        <div className="flex items-center gap-4">
          {/* Category Icon */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-4xl transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:border-green-300 group-hover:bg-green-50">
            {categoryIcon}
          </div>

          {/* Category Information */}
          <div>
            <h1 className="inline-block text-2xl font-bold text-gray-900 transition-all duration-300 hover:translate-x-1 hover:text-green-600 sm:text-3xl">
              {categoryName}
            </h1>

            <p className="mt-1 text-sm text-gray-500 transition-colors duration-300 hover:text-green-700 sm:text-base">
              <span className="inline-block font-semibold text-gray-700">
                {productCount.toLocaleString("bn-BD")}
              </span>{" "}
              টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      {/* Sort + Products */}
      <div className="mt-4">
        {data.length > 0 ? (
          <CategorySort products={data} />
        ) : (
          <div className="mt-5 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryProducts;
