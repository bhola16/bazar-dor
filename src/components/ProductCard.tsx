import { IProduct } from "@/type/Type";
import Link from "next/link";

interface ProductCardProps {
  product: IProduct;
}

const unitInBangla: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const ProductCard = ({ product }: ProductCardProps) => {
  const unit = unitInBangla[product.unit] || product.unit;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
    >
      {/* Product */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-green-200 bg-green-50 text-2xl transition-all duration-300 group-hover:scale-110 group-hover:border-green-400 group-hover:bg-green-100">
          <span className="transition-transform duration-300 group-hover:rotate-6">
            {product.image}
          </span>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 transition-colors duration-300 group-hover:text-green-700">
            {product.nameBn}
          </h3>

          <p className="mt-0.5 text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-700">
            প্রতি {unit}
          </p>
        </div>
      </div>

      {/* Price */}
      <p className="mt-5 text-sm text-gray-500 transition-colors duration-300 group-hover:text-green-700">
        আজকের দাম
      </p>

      <div className="mt-1 flex items-center justify-between gap-2">
        <p className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-700">
          {product.today.toLocaleString("bn-BD")} টাকা
        </p>

        {product.change.dir === "up" && (
          <p className="whitespace-nowrap font-semibold text-red-600 transition-transform duration-300 group-hover:scale-105">
            ▲ {product.change.pct.toLocaleString("bn-BD")}%
          </p>
        )}

        {product.change.dir === "down" && (
          <p className="whitespace-nowrap font-semibold text-green-600 transition-transform duration-300 group-hover:scale-105">
            ▼ {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
          </p>
        )}

        {product.change.dir === "flat" && (
          <p className="whitespace-nowrap font-semibold text-gray-500 transition-colors duration-300 group-hover:text-gray-700">
            — {product.change.pct.toLocaleString("bn-BD")}%
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
