// pages/success.js
"use client";
import { useEffect } from "react";

const Success = () => {
  useEffect(() => {
    const sendDataToBackend = async (data) => {
      try {
        const response = await axios.post("/api/payment/success", data);

        if (response.status === 200) {
          console.log("Data sent successfully:", response.data);
        } else {
          console.error("Failed to send data:", response.data);
        }
      } catch (error) {
        console.error("Error sending data:", error);
      }
    };

    const handleFormData = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const encResp = urlParams.get("encResp");
      const orderNo = urlParams.get("orderNo");
      const accessCode = urlParams.get("accessCode");
      //   const crossSellUrl = urlParams.get("crossSellUrl");

      if (encResp && orderNo && accessCode) {
        const formData = {
          encResp,
          orderNo,
          accessCode,
          //   crossSellUrl,
        };

        sendDataToBackend(formData);
      }
    };

    handleFormData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen w-full text-white text-2xl relative z-30">
      Payment Successful!
    </div>
  );
};

export default Success;
