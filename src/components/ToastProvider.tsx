"use client";

import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authStatus = params.get("auth");

    // Check whether a social sign-in was initiated.
    const loginSuccess = sessionStorage.getItem("loginSuccess");

    if (authStatus === "signup-success") {
      toast.success("সফলভাবে সাইন আপ হয়েছে।");
    } else if (authStatus === "required") {
      toast.info("এই পেজটি দেখতে প্রথমে সাইন ইন করুন।");
    } else if (authStatus === "success") {
      toast.success("সফলভাবে সাইন ইন হয়েছে!");
    } else if (authStatus === "signed-out") {
      toast.success("আপনি সফলভাবে সাইন আউট করেছেন!");
    } else if (loginSuccess === "true") {
      sessionStorage.removeItem("loginSuccess");

      const timeoutId = window.setTimeout(() => {
        toast.success("সফলভাবে সাইন ইন হয়েছে!");
      }, 100);

      // Clean up the timeout if the component unmounts.
      return () => window.clearTimeout(timeoutId);
    }

    // Remove the auth parameter to prevent repeated notifications.
    if (authStatus) {
      params.delete("auth");

      const query = params.toString();
      const newUrl = query
        ? `${window.location.pathname}?${query}${window.location.hash}`
        : `${window.location.pathname}${window.location.hash}`;

      window.history.replaceState(window.history.state, "", newUrl);
    }
  }, []);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      closeOnClick
      pauseOnHover
      newestOnTop
      theme="light"
    />
  );
}
