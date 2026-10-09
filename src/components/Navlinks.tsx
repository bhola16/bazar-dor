import { INavlinks } from "@/type/Type";
import Link from "next/link";

const Navlinks = async () => {
  "use cache";

  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data: INavlinks[] = await res.json();

  return (
    <nav className="border-t border-gray-100 bg-white transition-colors duration-300">
      <div className="mx-auto max-w-7xl overflow-x-auto">
        <div className="ml-10 flex min-w-max items-center justify-start gap-1 py-2">
          {data.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-all duration-300 hover:bg-green-50 hover:text-green-700 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:px-4"
            >
              <span className="inline-block transition-transform duration-300 group-hover:scale-125">
                {category.icon}
              </span>

              <span className="relative">
                {category.nameBn}
                <span className="absolute right-0 -bottom-1 left-0 h-0.5 origin-left scale-x-0 rounded-full bg-green-600 transition-transform duration-300 group-hover:scale-x-100" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navlinks;
