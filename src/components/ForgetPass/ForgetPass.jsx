import React, { useState } from "react";
import Button from "../Button/Button";
import emailService from "../../api/emailService";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [newPass, setNewPass] = useState("");
  const [reNewPass, setReNewPass] = useState("");
  const [otp, setOtp] = useState("");
  const [isRequire, setIsRequire] = useState(false);

  const getOTP = async () => {
    await emailService.getOtp(email);
    alert("Vui lòng nhận mã tại gmail");
    setIsRequire(true);
  };

  const resetPass = async () => {
    if (newPass === reNewPass) {
      const data = {
        newPassword: newPass,
        token: otp,
      };
      const response = await emailService.resetPass(data);
      alert("Đổi mật khẩu thành công");
      window.location.href = '/';
    } else {
      alert("Mật khẩu không trùng với xác nhận");
    }
  };

  return (
    <div className="p-4 pt-[9rem] flex flex-col bg-cinestar-black pb-5 gap-5">
      <div className="text-white text-4xl uppercase font-title">
        Quên mật khẩu
      </div>
      {/* nhập email */}
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
        <input
          type="button"
          value="Nhận mã"
          className="px-2 h-[35px] text-center rounded-md bg-cinestar-purple text-white cursor-pointer w-[10%] transition-all duration-150 hover:text-black hover:bg-cinestar-orange"
          onClick={getOTP}
        />
      </div>
      {/* nhập mã xác nhận */}
      <div className="flex flex-col text-[20px] gap-3">
        <label className="text-white">Nhập vào mã xác nhận</label>
        <input
          type="text"
          value={otp}
          className="h-[35px] rounded-md border-none outline-none pl-2 w-[70%]"
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      {/* nhập mk mới*/}
      {isRequire && (
        <>
          <div className="flex flex-col text-[20px] gap-3">
            <label className="text-white">Nhập mật khẩu mới</label>
            <input
              type="text"
              value={newPass}
              className="h-[35px] rounded-md border-none outline-none pl-2 w-[70%]"
              onChange={(e) => setNewPass(e.target.value)}
            />
          </div>
          {/* xác nhận lại mật khẩu mới */}
          <div className="flex flex-col text-[20px] gap-3">
            <label className="text-white">Xác nhận mật khẩu</label>
            <input
              type="text"
              value={reNewPass}
              className="h-[35px] rounded-md border-none outline-none pl-2 w-[70%]"
              onChange={(e) => setReNewPass(e.target.value)}
            />
          </div>
        </>
      )}

      <div className="flex justify-center pt-7">
        <Button
          className="button md:button bg-cinestar-purple w-[50%] h-[40px] text-white hidden group"
          text="Đổi mật khẩu"
          colorChange="bg-orange-yellow-gradient"
          onClick={resetPass}
        />
      </div>
    </div>
  );
};

export default ForgetPass;
