import { Quicksand } from "next/font/google";
import Image from "next/image";
import React from "react";
const quickSand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "300", "500", "700"],
  variable: "--font-quicksand",
});
function CarouselItem2({ image, text, isSubcategoryIcon, onclickItem }) {
  return (
    <div
      onClick={() => {
        onclickItem();
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <div
          className={` ${
            isSubcategoryIcon ? "border border-[#fcfcfc] border-opacity-20" : ""
          } h-20 w-20 rounded-full relative flex items-center justify-center  `}
        >
          {image != null ? (
            <Image
              src={image}
              alt=""
              height={68}
              width={68}
              className="object-contain !h-[68px] !w-[68px]"
            />
          ) : null}
        </div>
        <p
          className={`text-[12px] w-full text-center font-medium text-white ${quickSand.variable} font-quickSand`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

export default CarouselItem2;
