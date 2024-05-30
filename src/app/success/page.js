// pages/success.js
"use client";
import { useEffect } from "react";

const Success = () => {
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
      Payment Successful!
    </div>
  );
};

export default Success;
