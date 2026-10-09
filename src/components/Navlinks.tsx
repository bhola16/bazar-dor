import { INavlinks } from "@/type/Type";
import NavlinksClient from "./NavlinksClient";

const Navlinks = async () => {
  "use cache";

  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );

  const data: INavlinks[] = await res.json();

  return <NavlinksClient categories={data} />;
};

export default Navlinks;
