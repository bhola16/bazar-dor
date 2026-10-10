import { INavlinks } from "@/type/Type";
import NavlinksClient from "./NavlinksClient";

const Navlinks = async () => {
  "use cache";

  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: INavlinks[] = await res.json();

  return <NavlinksClient categories={data} />;
};

export default Navlinks;
