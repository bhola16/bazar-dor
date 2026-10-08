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

  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  const data: IProduct[] = await res.json();

  return (
    <div className="overflow-hidden border-y border-gray-200 bg-white">
      <MarqueeText duration={40} direction="right">
        <div className="flex items-center">
          {data.map((product) => {
            const unit = unitInBangla[product.unit] || product.unit;

            return (
              <div
                key={product.id}
                className="flex items-center gap-2 border-r border-gray-200 px-5 py-3 text-sm whitespace-nowrap"
              >
                <span className="text-lg">{product.categoryIcon}</span>

                <span className="font-medium text-gray-700">
                  {product.nameBn}
                </span>

                <span className="font-semibold text-gray-900">
                  {product.today.toLocaleString("bn-BD")} টাকা / {unit}
                </span>

                {product.change.dir === "up" && (
                  <span className="font-semibold text-red-500">
                    ▲ {product.change.pct.toLocaleString("bn-BD")}%
                  </span>
                )}

                {product.change.dir === "down" && (
                  <span className="font-semibold text-green-500">
                    ▼ {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                  </span>
                )}

                {product.change.dir === "flat" && (
                  <span className="font-semibold text-gray-500">
                    — {product.change.pct.toLocaleString("bn-BD")}%
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
