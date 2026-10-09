"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UserInfoPage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি।");
      return;
    }

    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="absolute right-4 hidden items-center gap-2 sm:flex">
      {user ? (
        <div className="flex items-center gap-3">
          {/* Profile Image */}
          <Link href="/profile" aria-label="প্রোফাইল দেখুন">
            {user.image ? (
              <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-green-600 ring-offset-2 ring-offset-white">
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-bold text-white ring-2 ring-green-600 ring-offset-2 ring-offset-white">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </Link>

          {/* User Name */}
          <h2 className="max-w-32 truncate font-semibold text-gray-800">
            {user.name}
          </h2>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="btn btn-sm border-green-600 bg-green-600 px-4 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-green-700 hover:bg-green-700 hover:shadow-md"
          >
            সাইন আউট
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link
            href="/signin"
            className="btn btn-sm border-0 text-md bg-white px-4 text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-50 hover:text-green-700"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="btn btn-sm text-md border-green-600 bg-green-600 px-4 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-green-700 hover:bg-green-700 hover:shadow-md"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfoPage;
