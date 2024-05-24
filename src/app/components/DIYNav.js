import Image from "next/image";
import React from "react";
import logoFooter from "@/app/assets/images/logoFooter.svg";
import { useRouter } from "next/navigation";
function DIYNav() {
  const router = useRouter();
  return (
    <div className="h-[8vh] w-full item-center justify-between px-8 border border-b border-[#000] border-opacity-20 md:flex hidden">
      {/* logo  */}
      <div className="flex items-center font-medium">
        {/* <Image /> */}
        <Image
          src={logoFooter}
          height={54}
          width={160}
          className="w-[160px] h-[54px] object-contain"
        />
      </div>
      {/* links and button  */}
      <div className="flex items-center gap-x-24">
        {/* links  */}
        <div className="text-[#696969] font-medium flex gap-x-8">
          <p className="cursor-pointer hover:text-black">About us</p>
          <p className="cursor-pointer hover:text-black">How it works</p>
          <p className="cursor-pointer hover:text-black">Feature</p>
          <p className="cursor-pointer hover:text-black">Industries</p>
          <p className="cursor-pointer hover:text-black">Testimonials</p>
          <p className="cursor-pointer hover:text-black">FAQs</p>
        </div>
        {/* buttons  */}
        <button
          onClick={() => router.push("/wizardform")}
          className="bg-[#3461FF] rounded-full px-6 py-2 text-white font-medium"
        >
          Let's Enroll
        </button>
      </div>
    </div>
  );
}

export default DIYNav;
