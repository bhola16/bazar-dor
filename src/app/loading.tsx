const LoadingPage = () => {
  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center">
        {/* Loading Spinner */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <span className="absolute inset-0 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

          <span className="text-sm font-bold text-green-700">Loading</span>
        </div>

        {/* Loading Message */}
        <p className="mt-5 text-sm font-medium text-gray-600">
          অনুগ্রহ করে অপেক্ষা করুন...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
