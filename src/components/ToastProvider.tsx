"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    const params = new URLSearchParams(window.location.search);
    const authStatus = params.get("auth");

    if (authStatus === "success" || authStatus === "oauth-success") {
      toast.success("সফলভাবে সাইন ইন হয়েছে!");
    } else if (
      authStatus === "signup-success" ||
      authStatus === "social-signup-success"
    ) {
      toast.success(
        authStatus === "social-signup-success"
          ? "সোশ্যাল অ্যাকাউন্ট দিয়ে সফলভাবে সাইন আপ হয়েছে!"
          : "সফলভাবে সাইন আপ হয়েছে।",
      );
    } else if (authStatus === "required") {
      toast.info("এই পেজটি দেখতে প্রথমে সাইন ইন করুন।");
    } else if (authStatus === "signed-out") {
      toast.success("আপনি সফলভাবে সাইন আউট করেছেন!");
    }

    if (authStatus) {
      params.delete("auth");

      const query = params.toString();
      const newUrl = query
        ? `${window.location.pathname}?${query}${window.location.hash}`
        : `${window.location.pathname}${window.location.hash}`;

      window.history.replaceState(window.history.state, "", newUrl);
    }
  }, [ready]);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={2500}
      closeOnClick
      pauseOnHover
      newestOnTop
      theme="light"
    />
  );
}
