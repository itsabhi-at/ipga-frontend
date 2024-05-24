import Image from "next/image";
import Login from "./registration/page";
import Landing from "./landing/page";
import bgImage from "@/app/assets/bgImage.jpeg";

export default function Home() {
  return (
    <main className="">
      <Landing />
    </main>
  );
}
