"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import dummy from "@/app/assets/images/dummy1.png";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "300", "500", "700"],
  variable: "--font-inter",
});
function ProductCard({
  id,
  name,
  shortDesc,
  points,
  brandName,
  image,
  perPax,
}) {
  const router = useRouter();
  return (
    <div
      className={`${inter.variable} font-inter col-span-1 border border-[#fcfcfc] border-opacity-[16%] bg-[#fcfcfc] bg-opacity-[4%] w-full rounded-xl flex flex-col`}
      onClick={() => {
        if (window.ObjectToaster) {
          let object = {
            message: "subcategoryClicked",
            title: "Product Description",
            url: `/product/${id}`,
          };
          ObjectToaster.postMessage(JSON.stringify(object));
        } else {
          router.push(`/product/${id}`);
        }
        // navigate to product page with the id
        // router.push(`/product/${id}`);
      }}
    >
      <div className="flex-1 p-2 w-full space-y-1">
        <div className="h-40 w-full rounded-[10px] relative">
          <Image
            fill
            alt=""
            className="h-full w-full object-contain"
            src={image}
          />
        </div>
        <p className="text-[10px] text-white font-bold w-full overflow-hidden h-[30px]">
          {name}{" "}
          {/* <span
            className="inline-block"
            dangerouslySetInnerHTML={{ __html: shortDesc }}
          ></span> */}
        </p>
        <p className="text-[10px] text-white">
          Redemption Points :{" "}
          <span className="text-productTextColor">{points}</span>{" "}
        </p>
        <p className="text-[10px] text-productTextColor">
          Brand:{" "}
          <span className="text-white">{brandName ? brandName : "N/A"}</span>{" "}
        </p>
      </div>
      <div className="text-white text-[6px] w-full text-right pr-2 pb-1">
        {perPax ? "Points per PAX" : ""}
      </div>
    </div>
  );
}

export default ProductCard;
