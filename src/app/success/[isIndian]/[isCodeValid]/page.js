// pages/success.js
"use client";
import { useEffect } from "react";
import success from "@/app/assets/success.svg";
import Image from "next/image";
import { useParams } from "next/navigation";
import { usePostCallWithAuthMutation } from "@/app/services/universalApi";
const Success = () => {
  let accessToken = null;
  typeof window !== "undefined"
    ? (accessToken = localStorage.getItem("accessToken"))
    : null;
  const params = useParams;
  const isIndian = params.isIndian;
  const isCodeValid = params.isCodeValid;
  const [postMutation] = usePostCallWithAuthMutation();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasRefreshed = sessionStorage.getItem("hasRefreshedOnce");

      if (!hasRefreshed) {
        sessionStorage.setItem("hasRefreshedOnce", "true");
        window.location.reload();
      }
    }
  }, []);
  useEffect(() => {
    const body = {
      amount: isIndian ? (isCodeValid ? 2360 : 3540) : 118,
      tax: isIndian ? (isCodeValid ? 360 : 540) : 18,
    };
    postMutation({
      url: "accounts/payment-success",
      body: body,
      accessToken,
    }).unwrap();
  }, [accessToken]);

  return (
    <main className="md:h-screen h-[90vh] min-h-screen relative z-30">
      <div className="h-full w-full flex items-center justify-center md:pt-0 pt-6">
        <div className="bg-black bg-opacity-70 md:h-[70%] md:w-[70%] w-[80%] h-[80vh] overflow-auto rounded-lg p-4 text-white">
          <Image
            src={success}
            alt=""
            height={200}
            width={200}
            className="mx-auto"
          />
          <p className="text-2xl mx-auto w-full text-center mt-8">
            Your payment is successful.{" "}
          </p>
          <p className="mx-auto px-0 md:px-12 w-full text-center mt-4">
            Thank you for registering for BDS 2024. You will receive
            registration confirmation along with paid invoice on your registered
            email id.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Success;
