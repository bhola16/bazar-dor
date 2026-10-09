import Image from "next/image";
import Link from "next/link";
import DateDisplay from "./DateDisplay";
import Navlinks from "./Navlinks";
import UserInfoPage from "./UserInfo";

const Header = () => {
  return (
    <header className=" relative z-50 overflow-visible border-b border-gray-200 bg-white transition-colors duration-300 hover:border-green-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo & Brand */}
        <Link href="/" className="group flex items-center gap-3">
          {/* Logo */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-green-700 group-hover:shadow-md">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={30}
              height={30}
              className="object-contain transition-transform duration-300 group-hover:rotate-6"
            />
          </div>

          {/* Brand Information */}
          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-green-600 sm:text-2xl">
              বাজার দর
            </h2>

            <div className="transition-colors duration-300 group-hover:text-green-700">
              <DateDisplay />
            </div>
          </div>
        </Link>

        {/* User Information */}
        <div className="transition-transform duration-300 hover:scale-[1.02]">
          <UserInfoPage />
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-gray-100">
        <Navlinks />
      </div>
    </header>
  );
};

export default Header;
