// pages/api/processPayment.js
import axios from "axios";
import crypto from "crypto";

export default ProcessPayment = async (req, res) => {
  const { amount, currency } = req.body;
  const merchantId = process.env.NEXT_PUBLIC_CCAVENUE_MERCHANT_ID;
  const accessCode = process.env.NEXT_PUBLIC_CCAVENUE_ACCESS_CODE;
  const workingKey = process.env.NEXT_PUBLIC_CCAVENUE_WORKING_KEY;

  // Encrypt data (as required by CC Avenue)
  const data = `merchant_id=${merchantId}&order_id=${new Date().getTime()}&amount=${amount}&currency=${currency}`;
  const encryptedData = crypto
    .createHmac("sha256", workingKey)
    .update(data)
    .digest("hex");

  try {
    const response = await axios.post(
      "https://secure.ccavenue.com/transaction/initTrans",
      {
        encRequest: encryptedData,
        access_code: accessCode,
      }
    );

    res.status(200).json({ paymentUrl: response.data.paymentUrl });
  } catch (error) {
    console.error("Error processing payment", error);
    res.status(500).json({ error: "Payment processing failed" });
  }
};
