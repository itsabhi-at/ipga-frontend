import React from "react";
import diyInsta from "@/app/assets/icons/diyInsta.svg";
import diyTwitter from "@/app/assets/icons/diyTwitter.svg";
import diyFacebook from "@/app/assets/icons/diyFacebook.svg";
import logoFooter from "@/app/assets/images/logoFooter.svg";
import Image from "next/image";
function DiyFooter() {
  return (
    <div>
      <div className="bg-white w-full h-auto flex md:flex-row flex-col md:items-center gap-y-12 justify-between md:px-20 md:py-16 p-4">
        <div className="flex-1 flex flex-col gap-y-12">
          <div className="relative">
            <Image
              src={logoFooter}
              height={84}
              width={286}
              className="w-[286px] h-[84px] object-contain"
            />
          </div>
          <div className="flex-row gap-x-8 hidden">
            <div className="cursor-pointer">
              <Image src={diyInsta} height={28} width={28} />
            </div>
            <div className="cursor-pointer">
              <Image src={diyTwitter} height={28} width={28} />
            </div>
            <div className="cursor-pointer">
              <Image src={diyFacebook} height={28} width={28} />
            </div>
          </div>
          <div className="">
            <button className="px-12 py-4 text-white bg-[#3461FF] rounded-full">
              Contact Us
            </button>
          </div>
        </div>
        <div className="flex-1 grid md:grid-cols-2 md:grid-rows-4 grid-cols-2 grid-rows-1 md:gap-12 gap-y-6 font-medium">
          <div className="cursor-pointer">Home</div>
          <div className="cursor-pointer">Terms & Conditions​</div>
          <div className="cursor-pointer">Privacy Policy</div>
          <div className="cursor-pointer">Contact Us​</div>
        </div>
      </div>
      <div className="md:h-32 text-sm font-medium h-auto bg-black w-full flex md:flex-row flex-col gap-y-2 items-center justify-between md:px-20 md:py-16 p-4">
        <div className="text-white">© 2024 SEPL. - All Rights Reserved</div>
        <div className="space-x-12 text-white flex">
          <p>Terms of use</p>
          <p>Privacy policy </p>
        </div>
      </div>
    </div>
  );
}

export default DiyFooter;
