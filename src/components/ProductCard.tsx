import { IProduct } from "@/type/Type";

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
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Product */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-green-200 bg-green-50 text-2xl">
          {product.image}
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">{product.nameBn}</h3>

          <p className="mt-0.5 text-sm text-gray-500">প্রতি {unit}</p>
        </div>
      </div>

      {/* Price */}
      <p className="mt-5 text-sm text-gray-500">আজকের দাম</p>

      <div className="mt-1 flex items-center justify-between gap-2">
        <p className="text-xl font-bold text-gray-900">
          {product.today.toLocaleString("bn-BD")} টাকা
        </p>

        {product.change.dir === "up" && (
          <p className="whitespace-nowrap font-semibold text-red-600">
            ▲ {product.change.pct.toLocaleString("bn-BD")}%
          </p>
        )}

        {product.change.dir === "down" && (
          <p className="whitespace-nowrap font-semibold text-green-600">
            ▼ {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
          </p>
        )}

        {product.change.dir === "flat" && (
          <p className="whitespace-nowrap font-semibold text-gray-500">
            — {product.change.pct.toLocaleString("bn-BD")}%
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
