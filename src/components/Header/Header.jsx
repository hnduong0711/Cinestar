import React, { useContext, useEffect, useState } from "react";
import {
  CinestarLogo,
  Popcorn,
  SearchIcon,
  TicketIcon,
  UserIcon,
} from "../../assets/index";
import Button from "../Button/Button";
import useWindowSize from "../../hooks/useWindowSize";
import ComboBox from "../Cbbox/ComboBox";
import GlobalContext from "../../context/GlobalContext/GlobalContext";
import SearchModal from "../Modal/SearchModal";
import { listTheater, subnav } from "../../constants/header";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Header = () => {
  const isSmallScreen = useWindowSize();
  const { setIsShowModal } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  const usernameData = sessionStorage.getItem("username");
  const [username, setUsername] = useState(
    JSON.parse(sessionStorage.getItem("username"))?.username || "Đăng nhập"
  );

  useEffect(() => {
    const storedData = sessionStorage.getItem("username");
    setUsername(JSON.parse(storedData)?.username || "Đăng nhập");
  }, [sessionStorage.getItem("username")]);

  const showModal = () => {
    setIsShowModal((prev) => !prev);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("username");
    setUsername("Đăng nhập");

    if (location.pathname === "/user") {
      navigate("/login"); // Chuyển hướng đến trang login
    }
  };

  const handleClick = () => {
    navigate("/popcorn-drink");
  };

  return (
    <div className="bg-cinestar-black flex-wrap py-4 xs:px-2 md:px-5 lg:px-20 fixed w-full left-0 z-[1000]">
      <div className="flex items-center justify-between border-b border-white border-opacity-20 pb-4">
        <div className="flex items-center justify-between basis-4/5 gap-3">
          <a href="/" className="w-[130px]">
            <img src={CinestarLogo} alt="Logo" />
          </a>
          <div className="flex">
            <Button
              icon={TicketIcon}
              className="button md:button bg-cinestar-gold w-[125px] h-[40px] mr-3 hidden group hover:text-white"
              text="Đặt vé ngay"
              colorChange="bg-purple-blue-gradient"
            />
            <Button
              icon={Popcorn}
              className="button md:button bg-cinestar-purple w-[125px] h-[40px] text-white hidden group"
              text="Đặt bắp nước"
              colorChange="bg-orange-yellow-gradient"
              onClick={handleClick} // Thêm hàm onClick
            />
          </div>
          {/* Search bar */}
          <div className="relative hidden md:flex items-center">
            <input
              type="text"
              className="hidden md:block rounded-2xl h-10 pl-3 text-sm w-[280px]"
              placeholder="Tìm kiếm"
            />
            <img
              src={SearchIcon}
              width={24}
              height={24}
              className="relative -left-7 font-semibold z-10"
              alt="search-icon"
            />
          </div>
          {/* Button responsive */}
          <ComboBox />
          <Button
            icon={SearchIcon}
            width="24"
            height="24"
            className="bg-white min-w-[70px] max-w-[125px] px-4 h-[40px] button md:hidden"
            text={isSmallScreen ? "" : "Tìm kiếm"}
            onClick={showModal}
          />
        </div>
        {/* Login */}
        <div className="relative w-[13%] text-white">
          {username !== "Đăng nhập" ? (
            // Người dùng đã đăng nhập
            <div className="group w-full">
              {/* Hiển thị tên và biểu tượng */}
              <div className="flex items-center gap-2 cursor-pointer after:h-[25px] after:w-[50%] after:absolute after:top-3">
                <UserCircleIcon className="w-6 h-6" />
                <span>{username}</span>
              </div>

              {/* Dropdown menu */}
              <div className="absolute mt-2 -left-[50%] bg-cinestar-black border border-slate-500 rounded-md p-3 flex-col space-y-3 hidden group-hover:flex w-full text-[14px]">
                <Link
                  to="user"
                  className="flex items-center gap-2 hover:text-cinestar-gold"
                >
                  <UserCircleIcon className="w-6 h-6" />
                  <span>Thông tin cá nhân</span>
                </Link>
                <div
                  onClick={handleLogout}
                  className="flex items-center gap-2 cursor-pointer hover:text-cinestar-gold"
                >
                  <ArrowLeftEndOnRectangleIcon className="w-6 h-6" />
                  <span>Đăng xuất</span>
                </div>
              </div>
            </div>
          ) : (
            // Người dùng chưa đăng nhập
            <Link
              to="login"
              className="flex items-center gap-2 text-white hover:text-cinestar-gold transition-all duration-300"
            >
              <img src={UserIcon} alt="user" width={24} height={24} />
              <span className="hidden lg:block">{username}</span>
            </Link>
          )}
        </div>
      </div>

      {/* Subnav header */}
      <div className="flex justify-between w-full mt-4 xs:px-2 md:px-5 lg:p-0">
        {subnav.map((item, index) => {
          const Element = item.to ? Link : "div";

          return (
            <Element
              to={item.to ? item.to : undefined}
              className={`flex font-bold text-white cursor-pointer group hover:text-cinestar-gold hover:transition-all hover:duration-200 ${
                item.icon
                  ? "after:block after:h-10 after:w-24 after:absolute after:top-50"
                  : ""
              }`}
              key={index}
            >
              {item.icon && (
                <item.icon className="w-5 h-5 text-white group-hover:text-cinestar-gold" />
              )}
              <span className="transition duration-300 group-hover:text-cinestar-gold">
                {item.name}
              </span>

              {/* Hiển thị listTheater khi hover */}
              {item.icon && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
                  <div className="hidden group-hover:flex text-white absolute left-[5%] z-10 bg-cinestar-black flex-wrap mt-10 border border-white border-opacity-50 rounded-md w-[90%]">
                    {listTheater.map((theater, theaterIndex) => (
                      <div
                        key={theaterIndex}
                        className="basis-1/3 px-1 py-4 hover:text-cinestar-gold transition duration-300"
                      >
                        {theater}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Element>
          );
        })}
      </div>
      {/* Search modal */}
      <SearchModal />
    </div>
  );
};

export default Header;
