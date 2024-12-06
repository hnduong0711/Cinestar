import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { login, registerUser } from "../../api/authService";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [haveAccount, setHaveAccount] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rePassword, setRePassword] = useState("");
  const navigate = useNavigate();

  // Ref
  const passwordRef = useRef(null);
  const loginRef = useRef(null);

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("authToken"));
    if (storedData) {
      navigate("/user");
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Kiểm tra thông tin
  const validateInfomation = () => {
    const usernamePasswordRegex = /^[a-zA-Z0-9]{1,16}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!usernamePasswordRegex.test(username)) return 1;
    else if (!usernamePasswordRegex.test(password)) return 2;
    else if (!emailRegex.test(email)) return 3;
    else return 0;
  };

  // Đăng nhập
  const handleLogin = async () => {
    const isValid = validateInfomation();
    if (isValid === 1) {
      alert("Tên đăng nhập cần chứa chữ và số tối đa 16 kí tự");
    } else if (isValid === 2) {
      alert("Mật khẩu cần chứa chữ và số tối đa 16 kí tự");
    } else {
      try {
        const x = await login(username, password);
        if (x === 200) {
          alert("Đăng nhập thành công !");
          navigate("/");
          window.scrollTo(0, 0);
        } else {
          alert("Tài khoản hoặc mật khẩu không đúng !");
        }
      } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        alert("Có lỗi xảy ra khi đăng nhập.");
      }
    }
  };

  // Đăng kí
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
      try {
        registerUser(username, password, email);
        alert("Đăng kí thành công");
        navigate("/");
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Lỗi đăng ký:", error);
        alert("Có lỗi xảy ra khi đăng ký.");
      }
    }
  };

  // Chuyển input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordRef.current.focus();
    }
  };

  const handleKeyDownLogin = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
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
                haveAccount
                  ? "bg-[#F8FAFC]"
                  : "text-white hover:bg-slate-300 hover:text-black rounded-md m-1"
              } rounded-tl-md rounded-tr-md py-2 px-2 w-full cursor-pointer transition-all duration-400`}
              onClick={() => setHaveAccount(true)}
            >
              Đăng nhập
            </div>
            <div
              className={`${
                !haveAccount
                  ? "bg-[#F8FAFC]"
                  : "text-white hover:bg-slate-300 hover:text-black rounded-md m-1"
              } rounded-tl-md rounded-tr-md py-2 px-2 w-full cursor-pointer transition-all duration-400`}
              onClick={() => setHaveAccount(false)}
            >
              Đăng ký
            </div>
          </div>
          {/* Content: login */}
          <form
            className={`bg-[#F8FAFC] space-y-2 px-10 py-16 rounded-b-md relative -mt-1 ${
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
                onKeyDown={handleKeyDown}
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
                ref={passwordRef}
                onKeyDown={handleKeyDownLogin}
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
            <div className="flex justify-end text-sm text-blue-500 underline cursor-pointer">
              <Link to="/forgetpass">Quên mật khẩu</Link>
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
            className={`bg-[#F8FAFC] space-y-2 px-10 py-16 rounded-b-md relative -mt-1 ${
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
