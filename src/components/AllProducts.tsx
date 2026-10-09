import { IProduct } from "@/type/Type";
import ProductCard from "./ProductCard";

const AllProducts = async () => {
  "use cache";

  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: IProduct[] = await res.json();

  return (
    <section
      id="all-products"
      className="mx-auto mt-10 mb-10 max-w-7xl scroll-mt-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>

      <p className="mt-1 text-sm text-gray-500">
        মোট {data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হয়েছে
      </p>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
