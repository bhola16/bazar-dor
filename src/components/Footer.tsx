const Footer = () => {
  return (
    <footer className="mt-auto border-y border-gray-200 bg-white transition-colors duration-300 hover:border-green-200">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-md text-gray-600 sm:flex-row sm:gap-4">
        {/* Brand Description */}
        <div className="cursor-default transition-all duration-300 hover:-translate-y-0.5 hover:text-green-700">
          বাজার দর – প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </div>

        {/* Price Disclaimer */}
        <div className="cursor-default text-center text-gray-500 transition-colors duration-300 hover:text-green-700 sm:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </div>
      </div>
    </footer>
  );
};

export default Footer;
