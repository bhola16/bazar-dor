import { IProduct } from "@/type/Type";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const unitInBangla: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const Marquee = async () => {
  "use cache";

  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );

  const data: IProduct[] = await res.json();

  return (
    <div className="relative z-0 isolate overflow-hidden border-y border-gray-200 bg-white transition-colors duration-300">
      <MarqueeText duration={40} direction="right">
        <div className="flex items-center">
          {data.map((product) => {
            const unit = unitInBangla[product.unit] || product.unit;
            const isUp = product.change.dir === "up";
            const isDown = product.change.dir === "down";
            const isFlat = product.change.dir === "flat";

            return (
              <div
                key={product.id}
                className="group flex cursor-default items-center gap-2 whitespace-nowrap border-r border-gray-200 px-5 py-3 text-sm transition-colors duration-300 hover:bg-green-50"
              >
                {/* Category Icon */}
                <span className="text-lg transition-transform duration-300 group-hover:scale-125">
                  {product.categoryIcon}
                </span>

                {/* Product Name */}
                <span className="font-medium text-gray-700 transition-colors duration-300 group-hover:text-green-700">
                  {product.nameBn}
                </span>

                {/* Today's Price */}
                <span className="font-semibold text-gray-900">
                  {product.today.toLocaleString("bn-BD")} টাকা / {unit}
                </span>

                {/* Price Change */}
                <span
                  className={`font-semibold transition-transform duration-300 group-hover:scale-105 ${
                    isUp
                      ? "text-red-600"
                      : isDown
                        ? "text-green-600"
                        : "text-gray-500"
                  }`}
                >
                  {isUp && "▲"}
                  {isDown && "▼"}
                  {isFlat && "—"}{" "}
                  {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                </span>
              </div>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
