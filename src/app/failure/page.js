// pages/success.js
"use client";
import { useEffect } from "react";
import failed from "@/app/assets/failed.svg";
import Image from "next/image";
const Failure = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasRefreshed = sessionStorage.getItem("hasRefreshedOnce");

      if (!hasRefreshed) {
        sessionStorage.setItem("hasRefreshedOnce", "true");
        window.location.reload();
      }
    }
  }, []);

  return (
    <main className="md:h-screen h-[90vh] min-h-screen relative z-30">
      <div className="h-full w-full flex items-center justify-center md:pt-0 pt-6">
        <div className="bg-black bg-opacity-70 md:h-[70%] md:w-[70%] w-[80%] h-[80vh] overflow-auto rounded-lg p-4 text-white">
          <Image
            src={failed}
            alt=""
            height={200}
            width={200}
            className="mx-auto"
          />
          <p className="text-2xl mx-auto w-full text-center mt-8">
            Your payment is Failed.
          </p>
          <p className="mx-auto px-0 md:px-12 w-full text-center mt-4">
            Oops! Something Went Wrong
          </p>
        </div>
      </div>
    </main>
  );
};

export default Failure;
