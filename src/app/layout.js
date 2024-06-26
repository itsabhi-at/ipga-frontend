import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import bgImage from "@/app/assets/bgImage.jpeg";
import banner from "@/app/assets/topBanner.jpeg";
import logo2 from "@/app/assets/logo2.png";
import grain from "@/app/assets/grain.jpeg";
import grains from "@/app/assets/grains.jpeg";
// const inter = Inter({ subsets: ["latin"] });
import { FaLocationPin } from "react-icons/fa6";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "300", "500", "700"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "IPGA",
  description: "Generated by STORY",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="manifest" href="manifest.json" />
      <body className={`${montserrat.className}`}>
        <div>
          <Toaster />
        </div>
        <Image
          src={bgImage}
          className="object-cover absolute h-full w-full z-10"
          fill
          alt=""
        />

        <div className="bg-black bg-opacity-60 h-full w-full absolute z-20"></div>
        <div className="absolute top-0 left-0 h-[12vh] w-full z-30 bg-[#404a3d] hidden md:block">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image src={logo2} className="" height={90} width={90} alt="" />
              <p className="text-[#fff] text-2xl font-medium">
                Bharat Dalhan Seminar 2024
              </p>
            </div>
            <div className="flex-1 flex flex-col mx-4 gap-y-1">
              <p className="text-yellow-300 w-full text-center text-xl">
                Save The Date
              </p>
              <div className="w-full h-[4px] bg-white"></div>
              <p className="text-white w-full text-center text-xl flex items-center justify-center">
                <FaLocationPin /> &nbsp; Vigyan Bhawan, Rajpath, New Delhi{" "}
                {"   "}&nbsp; | &nbsp; August 9th 2024
              </p>
            </div>
            <div className="relative flex gap-x-4 items-center">
              <Image
                src={grain}
                className="rounded-full border-2 border-white object-cover"
                height={80}
                width={80}
                alt=""
              />

              <Image
                src={grains}
                className="rounded-full border-2 border-white object-cover"
                height={80}
                width={80}
                alt=""
              />
            </div>
          </div>
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
