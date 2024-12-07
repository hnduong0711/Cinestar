import React, { useEffect } from "react";
import paymentSerVice from "../../api/paymentService";

const PaymentResult = () => {
  useEffect(() => {
    const { token } = JSON.parse(sessionStorage.getItem("authToken"));
    // Lấy toàn bộ URL
    const currentUrl = window.location.href;
    const queryString = currentUrl.split("?")[1];
    const newUrl = `http://localhost:5006/payment/api/Payment/payment_result?${queryString}`;
    const response = paymentSerVice.acceptPayment(newUrl, token);
    console.log(response);
  }, []);

  return (
    <div className="bg-green-500 text-5xl pt-[9rem] h-[500px] flex m-auto">
      Thanh toán thành công
    </div>
  );
};

export default PaymentResult;
