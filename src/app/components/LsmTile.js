import React from "react";
import { Dropdown } from "../lsmdashboard/page";
import Image from "next/image";
import lsmIcon1 from "@/app/assets/icons/lsmIcon1.svg";
function LsmTile() {
  return (
    <div className="bg-white min-h-[24vh] rounded-xl flex flex-col font-nunito justify-between p-4 relative gap-4">
      <p className="text-[#3D42DF]">Total Dealer</p>
      <p className="text-[#20224] font-semibold text-2xl">86</p>
      <Dropdown
        options={["Region", "Region 2"]}
        handleCallBack={(option) => {
          console.log(option);
        }}
      />
      <div className="flex justify-between items-center w-full text-[#20224] text-[12px] ">
        <p>Active</p>
        <p>TDS Consent</p>
        <p>Exit</p>
      </div>
      <Image
        src={lsmIcon1}
        alt="12"
        height={64}
        width={64}
        className="h-16 w-16 object-contain absolute right-4 top-4"
      />
    </div>
  );
}

export default LsmTile;
