// pages/failure.js
"use client";
import { useEffect } from "react";

const Failure = () => {
  useEffect(() => {
    // Handle failure logic
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen w-full text-white text-2xl">
      Payment Failed. Please try again.
    </div>
  );
};

export default Failure;
