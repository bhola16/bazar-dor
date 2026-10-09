const LoadingPage = () => {
  return (
    <main className="min-h-[75vh] bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Heading Skeleton */}
        <div className="animate-pulse">
          <div className="h-8 w-48 rounded-lg bg-gray-200" />
          <div className="mt-3 h-4 w-72 max-w-full rounded bg-gray-200" />
        </div>

        {/* Product Count and Sort Skeleton */}
        <div className="mt-8 flex animate-pulse items-center justify-between gap-4">
          <div className="h-5 w-40 rounded bg-gray-200" />
          <div className="h-10 w-36 rounded-lg bg-gray-200" />
        </div>

        {/* Product Card Skeletons */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              {/* Product Information */}
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 shrink-0 rounded-xl bg-gray-200" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-100" />
                </div>
              </div>

              {/* Price */}
              <div className="mt-6 h-6 w-2/3 rounded bg-gray-200" />

              {/* Price Change */}
              <div className="mt-3 h-4 w-1/3 rounded bg-gray-100" />

              {/* Additional Information */}
              <div className="mt-6 space-y-2">
                <div className="h-3 w-full rounded bg-gray-100" />
                <div className="h-3 w-4/5 rounded bg-gray-100" />
              </div>

              {/* Button */}
              <div className="mt-6 h-10 w-full rounded-lg bg-gray-200" />
            </div>
          ))}
        </div>

        {/* Loading Message */}
        <p className="mt-8 text-center text-sm font-medium text-gray-500">
          পণ্যের তথ্য লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
        </p>
      </div>
    </main>
  );
};

export default LoadingPage;
