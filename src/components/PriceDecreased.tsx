import { IProduct } from "@/type/Type";
import ProductCard from "./ProductCard";

const PriceDecreased = async () => {
  "use cache";

  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: IProduct[] = await res.json();

  const decreasedProducts = data
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="mx-auto mt-10 max-w-7xl">
      <h2 className="text-2xl font-bold text-gray-900">
        <span className="text-sm text-green-600">▼ </span>
        আজ দাম কমেছে
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {decreasedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PriceDecreased;
