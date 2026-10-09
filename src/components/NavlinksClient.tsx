"use client";

import { INavlinks } from "@/type/Type";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavlinksClientProps {
  categories: INavlinks[];
}

const NavlinksClient = ({ categories }: NavlinksClientProps) => {
  const pathname = usePathname();

  return (
    <nav className="border-t border-gray-100 bg-white transition-colors duration-300">
      <div className="mx-auto max-w-7xl overflow-x-auto">
        <div className="ml-10 flex min-w-max items-center justify-start gap-1 py-2">
          {categories.map((category) => {
            const href = `/category/${category.slug}`;
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={category.id}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 sm:px-4 ${
                  isActive
                    ? "bg-green-100 text-green-800 shadow-sm"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-700 hover:shadow-sm"
                }`}
              >
                <span
                  className={`inline-block transition-transform duration-300 ${
                    isActive ? "scale-110" : "group-hover:scale-125"
                  }`}
                >
                  {category.icon}
                </span>

                <span className="relative">
                  {category.nameBn}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-green-600 transition-transform duration-300 ${
                      isActive
                        ? "w-full scale-x-100"
                        : "w-full origin-left scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavlinksClient;
