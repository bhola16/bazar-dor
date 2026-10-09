import Image from "next/image";
import Link from "next/link";
import DateDisplay from "./DateDisplay";
import Navlinks from "./Navlinks";
import UserInfoPage from "./UserInfo";

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 shadow-sm">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={30}
              height={30}
              className="object-contain"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              বাজার দর
            </h2>

            <DateDisplay />
          </div>
        </Link>

        <UserInfoPage />
      </div>

      <Navlinks />
    </header>
  );
};

export default Header;
