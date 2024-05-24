import React from "react";
import dummy1 from "@/app/assets/images/dummy1.png";
import samsungAd from "@/app/assets/images/ss.png";
import Image from "next/image";

function CarouselItem({ image }) {
  return (
    <div className="h-full w-full bg-[#000] relative overflow-hidden rounded-[25px] border border-[#DEBA5C] p-4">
      {image != null && (
        <Image
          src={image}
          alt=""
          height={148}
          width={400}
          className="h-full w-full object-contain relative"
        />
      )}

      {/* <p className="text-white absolute bottom-8 left-1/2 -translate-x-1/2 w-4/5">
        Craving for a delicious meal to delight your taste buds?
      </p> */}
    </div>
  );
}

export default CarouselItem;
