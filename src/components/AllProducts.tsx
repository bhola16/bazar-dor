import { IProduct } from "@/type/Type";
import ProductCard from "./ProductCard";

const AllProducts = async () => {
  "use cache";

  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  const data: IProduct[] = await res.json();

  return (
    <section
      id="all-products"
      className="mx-auto mt-10 mb-10 max-w-7xl scroll-mt-6"
    >
      {/* Heading */}
      <h2 className="inline-block text-2xl font-bold text-gray-900 transition-all duration-300 hover:translate-x-1 hover:text-green-600">
        সব পণ্য
      </h2>

      {/* Product Count */}
      <p className="mt-1 text-md text-gray-500 transition-colors duration-300 hover:text-green-700">
        মোট{" "}
        <span className="font-semibold text-gray-700 transition-colors duration-300 hover:text-green-600">
          {data.length.toLocaleString("bn-BD")}
        </span>
        টি পণ্য দেখানো হয়েছে
      </p>

      {/* Products */}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
