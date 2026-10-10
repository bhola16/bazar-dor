import { INavlinks } from "@/type/Type";
import NavlinksClient from "./NavlinksClient";

const Navlinks = async () => {
  "use cache";

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: INavlinks[] = await res.json();

  return <NavlinksClient categories={data} />;
};

export default Navlinks;
