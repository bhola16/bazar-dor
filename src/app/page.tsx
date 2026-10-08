import AllProducts from "@/components/AllProducts";
import Banner from "@/components/Banner";
import PriceDecreased from "@/components/PriceDecreased";
import PriceIncreased from "@/components/PriceIncreased";

export default function Home() {
  return (
    <div>
      <Banner />
      <PriceIncreased />
      <PriceDecreased />
      <AllProducts />
    </div>
  );
}
