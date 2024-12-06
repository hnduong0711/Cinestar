import React, { useState } from "react";
import Button from "../Button/Button";

const ForgetPass = () => {
  const [email, setEmail] = useState();
  const [otp, setOtp] = useState();



  const getOTP = () => {
    
  }

  return (
    <div className="p-4 pt-[9rem] flex flex-col bg-cinestar-black pb-5 gap-5">
      <div className="text-white text-4xl uppercase font-title">
        Quên mật khẩu
      </div>
      <div className="flex flex-col justify-between gap-3">
        <div className="flex flex-col text-[20px] gap-3">
          <label className="text-white">Nhập vào email</label>
          <input
            type="email"
            value={email}
            className="h-[35px] rounded-md border-none outline-none pl-2 w-[70%]"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <input type="button" value="Nhận mã" className="px-2 h-[35px] text-center rounded-md bg-cinestar-purple text-white cursor-pointer w-[10%] transition-all duration-150 hover:text-black hover:bg-cinestar-orange" onClick={getOTP} />
      </div>
      <div className="flex flex-col text-[20px] gap-3">
        <label className="text-white">Nhập vào mã xác nhận</label>
        <input
          type="text"
          value={otp}
          className="h-[35px] rounded-md border-none outline-none pl-2 w-[70%]"
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      <div className="flex justify-center pt-7">
        <Button
          className="button md:button bg-cinestar-purple w-[50%] h-[40px] text-white hidden group"
          text="Đổi mật khẩu"
          colorChange="bg-orange-yellow-gradient"
        />
      </div>
    </div>
  );
};

export default ForgetPass;
