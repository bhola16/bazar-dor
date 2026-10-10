import { IProduct } from "@/type/Type";
import ProductCard from "./ProductCard";

const PriceDecreased = async () => {
  "use cache";

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  const data: IProduct[] = await res.json();

  const decreasedProducts = data
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="mx-auto mt-10 max-w-7xl">
      <h2 className="group inline-flex cursor-default items-center gap-1 text-2xl font-bold text-gray-900 transition-colors duration-300 hover:text-green-700">
        <span className="inline-block text-sm text-green-600 transition-transform duration-300 group-hover:scale-125">
          ▼
        </span>

        <span className="relative">
          আজ দাম কমেছে
          <span className="absolute right-0 -bottom-1 left-0 h-0.5 origin-left scale-x-0 rounded-full bg-green-600 transition-transform duration-300 group-hover:scale-x-100" />
        </span>
      </h2>

      {decreasedProducts.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {decreasedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500 transition-colors duration-300 hover:border-green-200 hover:bg-green-50">
          বর্তমানে কোনো পণ্যের দাম কমেনি।
        </div>
      )}
    </section>
  );
};

export default PriceDecreased;
