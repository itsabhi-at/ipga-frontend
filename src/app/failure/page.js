// pages/failure.js
"use client";
import { useEffect } from "react";

const Failure = () => {
  //   useEffect(() => {
  //     const hasRefreshed = localStorage.getItem("hasRefreshed");

  //     if (!hasRefreshed) {
  //       localStorage.setItem("hasRefreshed", "true");
  //       window.location.reload();
  //     } else {
  //       localStorage.removeItem("hasRefreshed");
  //     }
  //   }, []);

  return (
    <div className="flex items-center justify-center min-h-screen w-full text-white text-2xl relative z-30">
      Payment Failed. Please try again.
    </div>
  );
};

export default Failure;
