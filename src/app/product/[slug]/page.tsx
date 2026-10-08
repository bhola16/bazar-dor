import { IProduct } from "@/type/Type";
import Link from "next/link";

export const instant = false;

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

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

  const unit = unitInBangla[product.unit] || product.unit;

  const priceDifference = product.today - product.yesterday;

  return (
    <section className="mx-auto mt-10 w-full max-w-7xl">
      {/* Breadcrumb */}
      <div className="mb-4 text-md flex items-center gap-2  text-gray-500">
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

            <p className="mt-1 text-3xl font-bold text-gray-900">
              {product.today.toLocaleString("bn-BD")}
            </p>

            <p className="text-sm text-gray-500">টাকা/{unit}</p>

            <div className="mt-4">
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
    </section>
  );
};

export default ProductDetailsPage;
