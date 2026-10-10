import MarketPriceTable from "@/components/MarketPriceTable";
import { IMarket, IProduct, ProductDetailsPageProps } from "@/type/Type";
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

  const products: IProduct[] = await res.json();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const unit = unitInBangla[product.unit] || product.unit;
  const priceDifference = product.today - product.yesterday;

  const markets: IMarket[] =
    (product as IProduct & { markets?: IMarket[] }).markets ?? [];

  const todayMin =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const todayMax =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  const todayAverage =
    markets.length > 0
      ? Math.round(
          markets.reduce(
            (total, market) => total + (market.min + market.max) / 2,
            0,
          ) / markets.length,
        )
      : product.today;

  return (
    <section className="mx-auto mb-10 mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <Link
          href="/"
          className="transition-colors text-md duration-300 hover:text-green-600 focus-visible:outline-2 focus-visible:outline-green-600"
        >
          হোম
        </Link>

        <span>&gt;</span>

        <Link
          href={`/category/${product.category}`}
          className="transition-colors text-md duration-300 hover:text-green-600 focus-visible:outline-2 focus-visible:outline-green-600"
        >
          {product.categoryNameBn}
        </Link>

        <span>&gt;</span>

        <span className="font-medium text-md text-gray-700 hover:text-green-600">{product.nameBn}</span>
      </div>

      {/* Product Details */}
      <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px]">
          {/* Product Information */}
          <div className="p-6 transition-colors duration-300 hover:bg-green-50/30 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-green-50 text-5xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:border-green-200">
                {product.image}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 transition-colors duration-300 hover:text-green-600 sm:text-3xl">
                  {product.nameBn}
                </h1>

                <p className="mt-1 text-sm text-gray-500 transition-colors duration-300 hover:text-green-700 sm:text-base">
                  প্রতি {unit} • {product.categoryNameBn}
                </p>

                <div className="mt-2">
                  {priceDifference > 0 && (
                    <p className="text-sm text-gray-500">
                      গতকালের তুলনায় আজ দাম{" "}
                      <span className="font-bold text-red-600">বেড়েছে</span>{" "}
                      <span className="transition-colors duration-300 hover:text-red-700">
                        {priceDifference.toLocaleString("bn-BD")} টাকা
                      </span>
                    </p>
                  )}

                  {priceDifference < 0 && (
                    <p className="text-sm text-gray-500">
                      গতকালের তুলনায় আজ দাম{" "}
                      <span className="font-bold text-green-600">কমেছে</span>{" "}
                      <span className="transition-colors duration-300 hover:text-green-700">
                        {Math.abs(priceDifference).toLocaleString("bn-BD")} টাকা
                      </span>
                    </p>
                  )}

                  {priceDifference === 0 && (
                    <p className="text-sm font-medium text-gray-500">
                      গতকালের তুলনায় আজ দাম অপরিবর্তিত
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Today's Price */}
          <div className="m-4 flex flex-col items-center justify-center rounded-2xl bg-green-50 p-5 text-center transition-all duration-300 hover:scale-[1.02] hover:bg-green-100 hover:shadow-inner">
            <p className="text-sm text-gray-500 transition-colors duration-300 hover:text-green-700">
              আজকের দাম
            </p>

            <p className="mt-1 text-3xl font-bold text-gray-900 transition-transform duration-300 hover:scale-110">
              {product.today.toLocaleString("bn-BD")}
            </p>

            <p className="text-sm text-gray-500">টাকা/{unit}</p>

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
                <p className="font-semibold text-gray-500">
                  — {product.change.pct.toLocaleString("bn-BD")}%
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Today's Price Summary */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-green-200 hover:shadow-lg sm:p-8">
        <h2 className="text-xl font-bold text-gray-900 transition-colors duration-300 hover:text-green-600 sm:text-2xl">
          আজকের দামের সারসংক্ষেপ
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {markets.length > 0
            ? `মোট ${markets.length.toLocaleString("bn-BD")}টি বাজারের তথ্যের ভিত্তিতে`
            : "বাজারভিত্তিক তথ্য পাওয়া যায়নি; পণ্যের বর্তমান দাম দেখানো হচ্ছে।"}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Minimum */}
          <div className="group/min rounded-xl border border-gray-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:bg-green-50/50 hover:shadow-md">
            <p className="text-sm font-semibold text-gray-500 transition-colors duration-300 group-hover/min:text-green-700">
              সর্বনিম্ন দাম
            </p>

            <p className="mt-2 text-3xl font-bold text-green-700 transition-transform duration-300 group-hover/min:scale-105">
              {todayMin.toLocaleString("bn-BD")}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>

            <p className="mt-1 text-sm text-gray-500">প্রতি {unit}</p>
          </div>

          {/* Maximum */}
          <div className="group/max rounded-xl border border-gray-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-300 hover:bg-red-50/50 hover:shadow-md">
            <p className="text-sm font-semibold text-gray-500 transition-colors duration-300 group-hover/max:text-red-700">
              সর্বাধিক দাম
            </p>

            <p className="mt-2 text-3xl font-bold text-red-700 transition-transform duration-300 group-hover/max:scale-105">
              {todayMax.toLocaleString("bn-BD")}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>

            <p className="mt-1 text-sm text-gray-500">প্রতি {unit}</p>
          </div>

          {/* Average */}
          <div className="group/avg rounded-xl border border-gray-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md">
            <p className="text-sm font-semibold text-gray-500 transition-colors duration-300 group-hover/avg:text-blue-700">
              গড় দাম
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-700 transition-transform duration-300 group-hover/avg:scale-105">
              {todayAverage.toLocaleString("bn-BD")}{" "}
              <span className="text-sm font-medium">টাকা</span>
            </p>

            <p className="mt-1 text-sm text-gray-500">
              প্রতিটি বাজারের সর্বনিম্ন ও সর্বাধিক দামের মধ্যবিন্দুর গড়
            </p>
          </div>
        </div>
      </div>

      {/* Market-wise Today's Prices */}
      <div className="transition-all duration-300">
        <MarketPriceTable markets={markets} />
      </div>
    </section>
  );
};

export default ProductDetailsPage;
