"use client";

import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  useEffect(() => {
    const loginSuccess = sessionStorage.getItem("loginSuccess");

    if (loginSuccess === "true") {
      // Remove first so it cannot show twice
      sessionStorage.removeItem("loginSuccess");

      // Small delay allows ToastContainer to mount first
      setTimeout(() => {
        toast.success("Signed in successfully!");
      }, 100);
    }
  }, []);

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      closeOnClick
      pauseOnHover
    />
  );
}
