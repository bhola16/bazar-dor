import MarketPriceTable from "@/components/MarketPriceTable";
import {
  IMarket,
  IProduct,
  IProductDetails,
  ProductDetailsPageProps,
} from "@/type/Type";
import Link from "next/link";

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

  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  // Read the products response only once
  const products: IProduct[] = await res.json();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <section className="mx-auto mt-10 w-full max-w-7xl">
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            পণ্যটি পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-gray-500">
            আপনি যে পণ্যটি খুঁজছেন সেটি পাওয়া যায়নি।
          </p>
        </div>
      </section>
    );
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
      <div className="mb-4 text-md flex items-center gap-2 text-gray-500">
        <Link href="/" className="transition hover:text-green-600">
          হোম
        </Link>

        <span>&gt;</span>

        <Link
          href={`/category/${product.category}`}
          className="transition hover:text-green-600"
        >
          {product.categoryNameBn}
        </Link>

        <span>&gt;</span>

        <span className="font-medium text-gray-700">{product.nameBn}</span>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px]">
          {/* Left Side */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-4">
              {/* Product Image */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-green-50 text-5xl">
                {product.image}
              </div>

              {/* Product Information */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-sm text-gray-500 sm:text-base">
                  প্রতি {unit} • {product.categoryNameBn}
                </p>

                {/* Yesterday Comparison */}
                <div className="mt-2">
                  {priceDifference > 0 && (
                    <p className="text-md text-gray-500">
                      গতকালের তুলনায় আজ দাম{" "}
                      <span className="font-bold">বেড়েছে</span>{" "}
                      {priceDifference.toLocaleString("bn-BD")} টাকা
                    </p>
                  )}

                  {priceDifference < 0 && (
                    <p className="text-md text-gray-500">
                      গতকালের তুলনায় আজ দাম{" "}
                      <span className="font-bold">কমেছে</span>{" "}
                      {Math.abs(priceDifference).toLocaleString("bn-BD")} টাকা
                    </p>
                  )}

                  {priceDifference === 0 && (
                    <p className="text-md font-medium text-gray-500">
                      গতকালের তুলনায় আজ দাম অপরিবর্তিত
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="m-4 flex flex-col items-center justify-center rounded-2xl bg-green-100/50 p-5 text-center">
            <p className="text-md text-gray-500">আজকের দাম</p>

            <p className="text-3xl font-bold text-gray-900">
              {product.today.toLocaleString("bn-BD")}
            </p>

            <p className="text-sm text-gray-500">টাকা/{unit}</p>

            <div className="mt-2">
              {product.change.dir === "up" && (
                <p className="font-semibold text-red-600">
                  ▲ {product.change.pct.toLocaleString("bn-BD")}%
                </p>
              )}

              {product.change.dir === "down" && (
                <p className="font-semibold text-green-600">
                  ▼ {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                </p>
              )}

              {product.change.dir === "flat" && (
                <p className="font-semibold text-gray-500">
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
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Minimum Price */}
            <div className="rounded-2xl border border-gray-200 bg-base p-5">
              <p className="text-md font-semibold text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="text-4xl font-bold text-green-700">
                {Math.min(
                  product.today,
                  product.yesterday,
                  product.lastWeek,
                ).toLocaleString("bn-BD")}{" "}
                <span className="text-base font-medium">টাকা</span>
              </p>

              <p className="mt-1 text-sm text-gray-600">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            {/* Maximum Price */}
            <div className="rounded-2xl border border-gray-200 bg-base p-5">
              <p className="text-md font-semibold text-gray-500">
                সর্বাধিক দাম
              </p>

              <p className="text-red-700 text-4xl font-bold">
                {Math.max(
                  product.today,
                  product.yesterday,
                  product.lastWeek,
                ).toLocaleString("bn-BD")}{" "}
                <span className="text-base font-medium">টাকা</span>
              </p>

              <p className="mt-1 text-sm text-gray-600">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            {/* Average Price */}
            <div className="rounded-2xl border border-gray-200 bg-base p-5">
              <p className="text-md font-semibold text-gray-500">গড় দাম</p>

              <p className="text-3xl font-bold text-green-700">
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
                <span className="text-base font-medium">টাকা</span>
              </p>

              <p className="mt-1 text-sm text-gray-600">
                প্রতি {unit}-এর হিসাব
              </p>
            </div>
          </div>

          <MarketPriceTable markets={markets} />
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
