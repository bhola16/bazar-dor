"use client";

import { useEffect, useState } from "react";

const DateDisplay = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    });

    setDate(today);
  }, []);

  return <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">{date}</p>;
};

export default DateDisplay;
