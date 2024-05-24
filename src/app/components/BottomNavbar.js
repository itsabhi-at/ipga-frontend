import Image from "next/image";
import React from "react";
import { AiOutlineBell, AiOutlineMenu } from "react-icons/ai";
import bnb1 from "@/app/assets/icons/bnb1.png";
import bnb2 from "@/app/assets/icons/bnb2.png";
import bnb3 from "@/app/assets/icons/bnb3.png";
import bnb4 from "@/app/assets/icons/bnb4.png";
import { useRouter } from "next/navigation";

function BottomNavbar() {
  const router = useRouter();
  return (
    <div className="absolute bottom-0 mb-0 w-full left-0 px-4 text-white shadow-2xl h-20 flex items-center justify-between primary-color-bg z-[100]">
      <div className="flex flex-col gap-y-2 items-center">
        <Image
          onClick={() => router.push("/siel-home")}
          className="object-contain h-6 w-12"
          src={bnb1}
          height={24}
          width={48}
        />
        <p className="text-[8px]">PC Home</p>
      </div>
      <div className="flex flex-col gap-y-2 items-center">
        <Image
          onClick={() => router.push("/partner-report")}
          className="object-contain h-6 w-12"
          src={bnb3}
          height={24}
          width={48}
        />
        <p className="text-[8px]">Partner Report</p>
      </div>
      <div className="flex flex-col gap-y-2 items-center">
        <Image
          // onClick={() => router.push("/home")}
          className="object-contain h-6 w-12"
          src={bnb3}
          height={24}
          width={48}
        />
        <p className="text-[8px]">Privilege Catalogue</p>
      </div>
      <div className="flex flex-col gap-y-2 items-center">
        <Image
          // onClick={() => router.push("/home")}
          className="object-contain h-6 w-12"
          src={bnb4}
          height={24}
          width={48}
        />
        <p className="text-[8px]">PC Spotlight</p>
      </div>
    </div>
  );
}

export default BottomNavbar;
