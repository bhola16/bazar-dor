
import MarketPriceTable from "@/components/MarketPriceTable";
import {
  IMarket,
  IProduct,
  IProductDetails,
  ProductDetailsPageProps,
} from "@/type/Type";
import Link from "next/link";
import { notFound } from "next/navigation";

export const instant = false;

const unitInBangla: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const ProductDetailsPage = async ({ params }: ProductDetailsPageProps) => {
  "use cache";

  const { slug } = await params;

  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  // Read the products response only once
  const products: IProduct[] = await res.json();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  // Fetch details for the selected product
  const detailRes = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${product.id}`,
  );

  const productDetails: IProductDetails | null = detailRes.ok
    ? await detailRes.json()
    : null;

  const markets: IMarket[] = Array.isArray(productDetails?.markets)
    ? productDetails.markets
    : [];

  const unit = unitInBangla[product.unit] || product.unit;

  const priceDifference = product.today - product.yesterday;

  return (
    <section className="mx-auto mt-10 mb-10 w-full max-w-7xl">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center gap-2 text-md text-gray-500">
        <Link
          href="/"
          className="transition-colors duration-300 hover:text-green-600"
        >
          হোম
        </Link>

        <span className="transition-colors duration-300 hover:text-green-600">
          &gt;
        </span>

        <Link
          href={`/category/${product.category}`}
          className="transition-colors duration-300 hover:text-green-600"
        >
          {product.categoryNameBn}
        </Link>

        <span className="transition-colors duration-300 hover:text-green-600">
          &gt;
        </span>

        <span className="font-medium text-gray-700 transition-colors duration-300 hover:text-green-600">
          {product.nameBn}
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px]">
          {/* Left Side */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-4">
              {/* Product Image */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-green-50 text-5xl transition-transform duration-300 hover:scale-110">
                {product.image}
              </div>

              {/* Product Information */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 transition-colors duration-300 hover:text-green-600 sm:text-3xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-sm text-gray-500 transition-colors duration-300 hover:text-green-700 sm:text-base">
                  প্রতি {unit} • {product.categoryNameBn}
                </p>

                {/* Yesterday Comparison */}
                <div className="mt-2">
                  {priceDifference > 0 && (
                    <p className="text-md text-gray-500 transition-colors duration-300 hover:text-red-600">
                      গতকালের তুলনায় আজ দাম{" "}
                      <span className="font-bold transition-colors duration-300 hover:text-red-700">
                        বেড়েছে
                      </span>{" "}
                      <span className="font-semibold transition-colors duration-300 hover:text-red-600">
                        {priceDifference.toLocaleString("bn-BD")} টাকা
                      </span>
                    </p>
                  )}

                  {priceDifference < 0 && (
                    <p className="text-md text-gray-500 transition-colors duration-300 hover:text-green-600">
                      গতকালের তুলনায় আজ দাম{" "}
                      <span className="font-bold transition-colors duration-300 hover:text-green-700">
                        কমেছে
                      </span>{" "}
                      <span className="font-semibold transition-colors duration-300 hover:text-green-600">
                        {Math.abs(priceDifference).toLocaleString("bn-BD")} টাকা
                      </span>
                    </p>
                  )}

                  {priceDifference === 0 && (
                    <p className="text-md font-medium text-gray-500 transition-colors duration-300 hover:text-green-600">
                      গতকালের তুলনায় আজ দাম অপরিবর্তিত
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="m-4 flex flex-col items-center justify-center rounded-2xl bg-green-100/50 p-5 text-center transition-colors duration-300 hover:bg-green-100">
            <p className="text-md text-gray-500 transition-colors duration-300 hover:text-green-700">
              আজকের দাম
            </p>

            <p className="text-3xl font-bold text-gray-900 transition-transform duration-300 hover:scale-105">
              {product.today.toLocaleString("bn-BD")}
            </p>

            <p className="text-sm text-gray-500 transition-colors duration-300 hover:text-green-700">
              টাকা/{unit}
            </p>

            <div className="mt-2">
              {product.change.dir === "up" && (
                <p className="font-semibold text-red-600 transition-transform duration-300 hover:scale-110">
                  ▲ {product.change.pct.toLocaleString("bn-BD")}%
                </p>
              )}

              {product.change.dir === "down" && (
                <p className="font-semibold text-green-600 transition-transform duration-300 hover:scale-110">
                  ▼ {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                </p>
              )}

              {product.change.dir === "flat" && (
                <p className="font-semibold text-gray-500 transition-colors duration-300 hover:text-green-600">
                  — {product.change.pct.toLocaleString("bn-BD")}%
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary section */}
      <div>
        {/* Price Summary */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 transition-colors duration-300 hover:text-green-600 sm:text-2xl">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Minimum Price */}
            <div className="rounded-2xl border border-gray-200 bg-base p-5 transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-md">
              <p className="text-md font-semibold text-gray-500 transition-colors duration-300 hover:text-green-700">
                সর্বনিম্ন দাম
              </p>

              <p className="text-4xl font-bold text-green-700 transition-transform duration-300 hover:scale-105">
                {Math.min(
                  product.today,
                  product.yesterday,
                  product.lastWeek,
                ).toLocaleString("bn-BD")}{" "}
                <span className="text-base font-medium transition-colors duration-300 hover:text-green-900">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-sm text-gray-600 transition-colors duration-300 hover:text-green-700">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Maximum Price */}
            <div className="rounded-2xl border border-gray-200 bg-base p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:shadow-md">
              <p className="text-md font-semibold text-gray-500 transition-colors duration-300 hover:text-red-600">
                সর্বাধিক দাম
              </p>

              <p className="text-4xl font-bold text-red-700 transition-transform duration-300 hover:scale-105">
                {Math.max(
                  product.today,
                  product.yesterday,
                  product.lastWeek,
                ).toLocaleString("bn-BD")}{" "}
                <span className="text-base font-medium transition-colors duration-300 hover:text-red-900">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-sm text-gray-600 transition-colors duration-300 hover:text-red-600">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* Average Price */}
            <div className="rounded-2xl border border-gray-200 bg-base p-5 transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-md">
              <p className="text-md font-semibold text-gray-500 transition-colors duration-300 hover:text-green-700">
                গড় দাম
              </p>

              <p className="text-3xl font-bold text-green-700 transition-transform duration-300 hover:scale-105">
                {Math.round(
                  (Math.max(
                    product.today,
                    product.yesterday,
                    product.lastWeek,
                  ) +
                    Math.min(
                      product.today,
                      product.yesterday,
                      product.lastWeek,
                    )) /
                    2,
                ).toLocaleString("bn-BD")}{" "}
                <span className="text-base font-medium transition-colors duration-300 hover:text-green-900">
                  টাকা
                </span>
              </p>

              <p className="mt-1 text-sm text-gray-600 transition-colors duration-300 hover:text-green-700">
                প্রতি {unit}-এর হিসাব
              </p>
            </div>
          </div>

          <div className="mt-6">
            <MarketPriceTable markets={markets} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
