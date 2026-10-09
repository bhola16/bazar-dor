const CategoryLoading = () => {
  return (
    <main className="min-h-[75vh] bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Category Header Skeleton */}
        <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-200" />

            <div className="flex-1 space-y-3">
              <div className="h-7 w-48 max-w-full rounded bg-gray-200" />
              <div className="h-4 w-64 max-w-full rounded bg-gray-100" />
            </div>
          </div>
        </div>

        {/* Product Count Skeleton */}
        <div className="mt-5 h-4 w-48 animate-pulse rounded bg-gray-200" />


        {/* Product Cards Skeleton */}
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-200" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-100" />
                </div>
              </div>

              <div className="mt-6 h-6 w-2/3 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-1/3 rounded bg-gray-100" />

              <div className="mt-6 space-y-2">
                <div className="h-3 w-full rounded bg-gray-100" />
                <div className="h-3 w-4/5 rounded bg-gray-100" />
              </div>

              <div className="mt-6 h-10 w-full rounded-lg bg-gray-200" />
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          ক্যাটাগরির পণ্যের তথ্য লোড হচ্ছে...
        </p>
      </div>
    </main>
  );
};

export default CategoryLoading;
