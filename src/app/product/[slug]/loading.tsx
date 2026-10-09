const ProductDetailsLoading = () => {
  return (
    <main className="min-h-[75vh] bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6 flex animate-pulse items-center gap-2">
          <div className="h-4 w-16 rounded bg-gray-200" />
          <div className="h-4 w-3 rounded bg-gray-100" />
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-4 w-3 rounded bg-gray-100" />
          <div className="h-4 w-32 rounded bg-gray-200" />
        </div>

        {/* Product Details Card */}
        <section className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row">
            {/* Product Image */}
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-xl bg-gray-200 sm:h-40 sm:w-40" />

            {/* Product Information */}
            <div className="flex-1 space-y-4">
              <div className="h-7 w-2/3 max-w-full rounded bg-gray-200" />
              <div className="h-4 w-1/3 rounded bg-gray-100" />
              <div className="h-9 w-48 max-w-full rounded bg-gray-200" />
              <div className="h-4 w-32 rounded bg-gray-100" />
              <div className="h-5 w-40 rounded bg-gray-200" />
            </div>
          </div>
        </section>

        {/* Price Summary Cards */}
        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="mt-4 h-8 w-32 rounded bg-gray-200" />
              <div className="mt-3 h-3 w-20 rounded bg-gray-100" />
            </div>
          ))}
        </section>

        {/* Market Price Table */}
        <section className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="animate-pulse border-b border-gray-200 p-5">
            <div className="h-6 w-56 max-w-full rounded bg-gray-200" />
            <div className="mt-3 h-4 w-72 max-w-full rounded bg-gray-100" />
          </div>

          <div className="space-y-4 p-5">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="flex animate-pulse items-center gap-4"
              >
                <div className="h-4 w-1/4 rounded bg-gray-200" />
                <div className="h-4 w-1/5 rounded bg-gray-100" />
                <div className="h-4 w-1/5 rounded bg-gray-200" />
                <div className="h-4 w-1/5 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </section>

        <p className="mt-8 text-center text-sm font-medium text-gray-500">
          পণ্যের বিস্তারিত ও বাজারদর লোড হচ্ছে...
        </p>
      </div>
    </main>
  );
};

export default ProductDetailsLoading;
