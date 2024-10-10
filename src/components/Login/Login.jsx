import React, { useState } from "react";
import Button from "../Button/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
const Login = () => {
  const [haveAccount, setHaveAccount] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rePassword, setRePassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateInfomation = () => {
    const usernamePasswordRegex = /^[a-zA-Z0-9]{1,16}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!usernamePasswordRegex.test(username)) return 1;
    else if (!usernamePasswordRegex.test(password)) return 2;
    else if (!emailRegex.test(email)) return 3;
    else return 0;
  };

  const handleLogin = () => {
    const isValid = validateInfomation();
    if (isValid === 1) {
      alert("Tên đăng nhập cần chứa chữ và số tối đa 16 kí tự");
    } else if (isValid === 2) {
      alert("Mật khẩu cần chứa chữ và số tối đa 16 kí tự");
    } else {
      alert("Thành công");
    }
  };

  const handleRegis = () => {
    const isValid = validateInfomation();
    if (isValid === 1) {
      alert("Tên đăng nhập cần chứa chữ và số tối đa 16 kí tự");
    } else if (isValid === 2) {
      alert("Mật khẩu cần chứa chữ và số tối đa 16 kí tự");
    } else if (isValid === 3) {
      alert("Email chưa đúng định dạng");
    } else if (password !== rePassword) {
      alert("Mật khẩu chưa khớp với xác nhận");
    } else {
      alert("Thành công");
    }
  };

  return (
    <div className="pt-36 pb-5 w-full relative bg-[url('assets/bg-regis.jpg')] bg-cover bg-no-repeat bg-center">
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="relative lg:grid lg:grid-cols-2 grid-cols-1 flex justify-center z-20">
        <div className="rounded-md lg:pl-[4.5rem] px-5 lg:w-full w-[80%]">
          {/* Navbar */}
          <div className="flex items-center justify-around uppercase font-title font-bold text-xl text-center">
            <div
              className={`${
                haveAccount ? "bg-[#F8FAFC]" : "opacity-0"
              } rounded-tl-md rounded-tr-md py-2 px-2 w-full cursor-pointer transition-all duration-400`}
              onClick={() => setHaveAccount(true)}
            >
              Đăng nhập
            </div>
            <div
              className={`${
                !haveAccount ? "bg-[#F8FAFC]" : "opacity-0"
              } rounded-tl-md rounded-tr-md py-2 px-2 w-full cursor-pointer transition-all duration-400`}
              onClick={() => setHaveAccount(false)}
            >
              Đăng kí
            </div>
          </div>
          {/* Content: login */}
          <form
            className={`bg-[#F8FAFC] space-y-2 px-10 py-16 rounded-b-md ${
              haveAccount ? "block" : "hidden transition-all duration-200"
            }`}
          >
            <div className="flex flex-col space-y-2 ">
              <span>Tên đăng nhập</span>
              <input
                type="text"
                className="h-12 p-2 outline-none bg-white border border-slate-300"
                placeholder="Nhập tên tài khoản"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative flex flex-col space-y-2">
              <span>Mật khẩu</span>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full h-12 p-2 pr-10 border border-slate-300 outline-none "
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Icon mắt với absolute để nó nằm ở góc phải */}
              <span
                className="absolute top-[35px] right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeIcon className="w-6 h-6 text-gray-500" /> // Icon khi hiện mật khẩu
                ) : (
                  <EyeSlashIcon className="w-6 h-6 text-gray-500" /> // Icon khi ẩn mật khẩu
                )}
              </span>
            </div>
            <div className="pt-10">
              <Button
                colorChange="bg-purple-blue-gradient"
                width="24"
                height="24"
                className="button bg-cinestar-gold h-[40px] text-black group hover:text-white"
                text="Đăng nhập"
                onClick={handleLogin}
              />
            </div>
          </form>
          {/* Content: register */}
          <form
            className={`bg-[#F8FAFC] space-y-2 px-10 py-16 rounded-b-md ${
              !haveAccount ? "block" : "hidden transition-all duration-200"
            }`}
          >
            <div className="flex flex-col space-y-2 ">
              <span>Tên đăng nhập</span>
              <input
                type="text"
                className="h-12 p-2 outline-none bg-white border border-slate-300"
                placeholder="Nhập tên tài khoản"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2 ">
              <span>Email</span>
              <input
                type="text"
                className="h-12 p-2 outline-none bg-white border border-slate-300"
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative flex flex-col space-y-2">
              <span>Mật khẩu</span>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full h-12 p-2 pr-10 border border-slate-300 outline-none"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Icon mắt với absolute để nó nằm ở góc phải */}
              <span
                className="absolute top-[35px] right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeIcon className="w-6 h-6 text-gray-500" /> // Icon khi hiện mật khẩu
                ) : (
                  <EyeSlashIcon className="w-6 h-6 text-gray-500" /> // Icon khi ẩn mật khẩu
                )}
              </span>
            </div>
            <div className="relative flex flex-col space-y-2">
              <span>Xác nhận mật khẩu</span>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full h-12 p-2 pr-10 border border-slate-300 outline-none "
                placeholder="Nhập lại mật khẩu"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />

              {/* Icon mắt với absolute để nó nằm ở góc phải */}
              <span
                className="absolute top-[35px] right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeIcon className="w-6 h-6 text-gray-500" /> // Icon khi hiện mật khẩu
                ) : (
                  <EyeSlashIcon className="w-6 h-6 text-gray-500" /> // Icon khi ẩn mật khẩu
                )}
              </span>
            </div>
            <div className="pt-10">
              <Button
                colorChange="bg-purple-blue-gradient"
                width="24"
                height="24"
                className="button bg-cinestar-gold h-[40px] text-black group hover:text-white"
                text="Đăng ký"
                onClick={handleRegis}
              />
            </div>
          </form>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Login;
