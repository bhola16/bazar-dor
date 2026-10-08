import { INavlinks } from "@/type/Type";
import Link from "next/link";

const Navlinks = async () => {
  "use cache";

  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );

  const data: INavlinks[] = await res.json();

  return (
    <nav className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl overflow-x-auto">
        <div className="flex min-w-max items-center justify-start gap-1 py-2">
          {data.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-green-50 hover:text-green-600 sm:px-4"
            >
              <span>{category.icon}</span>
              <span>{category.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navlinks;
