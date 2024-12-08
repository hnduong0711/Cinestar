import React, { useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserIcon } from "../../assets/index";
import userService from "../../api/userService";
import ticketService from "../../api/ticketService";
import scheduleService from "../../api/scheduleService";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import DetailTickelModal from "../../components/Modal/DetailTickelModal";

const UserPage = () => {
  const [tab, setTab] = useState(true);
  const [allTicket, setAllTicket] = useState([]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [newTicketList, setNewTicketList] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [ticketId, setTicketId] = useState();

  const setTabInfo = () => {
    setTab(true);
  };

  const setTabHistory = () => {
    setTab(false);
  };

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // lấy data user
  useEffect(() => {
    const fetchData = async () => {
      const { token } = JSON.parse(sessionStorage.getItem("authToken"));
      const user = JSON.parse(sessionStorage.getItem("username"));
      const response = await userService.getUser(user.id, token);
      setUser(response);
    };
    fetchData();
  }, []);

  // lấy data ticket của user
  useEffect(() => {
    const { token } = JSON.parse(sessionStorage.getItem("authToken"));
    const { id } = JSON.parse(sessionStorage.getItem("username"));
    const getTicketByUser = async (id, token) => {
      const response = await ticketService.getAllTicketByUser(id, token);
      setAllTicket(response);
      console.log(response);
    };
    getTicketByUser(id, token);
  }, []);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
    }
  }, [user]);

  // định dạng ngày hiển thị
  const formatDateTime = (dateTimeString) => {
    const [date, time] = dateTimeString.split("T");
    const formattedDate = date.split("-").reverse().join("/");
    const formattedTime = time.slice(0, 5);
    return `${formattedTime} | ${formattedDate}`;
  };

  // lấy schedule tạo ra list ticket mới
  useEffect(() => {
    const fetchData = async () => {
      const updatedTickets = await Promise.all(
        allTicket.map(async (ticket) => {
          const schedule = await scheduleService.getScheduleByIdSchedule(
            ticket.movieScheduleId
          );
          console.log(schedule);

          return {
            id: ticket.id,
            filmName: schedule.movieSchedule.movie["name"],
            showTime: formatDateTime(schedule.movieSchedule.showTime),
            baseAmount: ticket.baseAmount,
            detailTicket: <ExclamationCircleIcon className="size-6" />,
          };
        })
      );
      setNewTicketList(updatedTickets);
    };
    fetchData();
  }, [allTicket]);

  console.log(newTicketList);

  const handleChangeInfo = async () => {
    const data = {
      id: user.id,
      username: user.username,
      email: email || user.email,
      password: user.password,
      confirmMailToken: user.confirmMailToken,
      isEmailVerified: user.isEmailVerified,
      roles: user.roles,
      departments: user.departments,
    };
    const { token } = JSON.parse(sessionStorage.getItem("authToken"));
    const response = await userService.updateUser(user.id, data, token);
    alert("Đổi thông tin thành công !");
    console.log(response);
  };

  const changePassword = async () => {
    if (password !== user.password) {
      alert("Mật khẩu cũ không đúng !");
    } else {
      if (rePassword !== newPassword) {
        alert("Mật khẩu xác nhận không khớp");
      } else {
        const data = {
          id: user.id,
          username: user.username,
          email: email || user.email,
          password: newPassword,
          confirmMailToken: user.confirmMailToken,
          isEmailVerified: user.isEmailVerified,
          roles: user.roles,
          departments: user.departments,
        };
        const { token } = JSON.parse(sessionStorage.getItem("authToken"));
        const response = await userService.updateUser(user.id, data, token);
        console.log(response);
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("username");
    navigate("/");
    window.scrollTo(0, 0);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const showDetail = (id) => {
    console.log(id);
    setTicketId(id);
  };

  return (
    <div className=" min-h-screen p-8">
      <div className="container flex mt-32 mx-auto">
        <div className="w-1/5 p-4 py-8 bg-purple-blue-gradient text-white rounded-lg h-fit">
          <div className="flex items-center space-x-4">
            <img src={UserIcon} alt="user" width={48} height={48} />
            <div>
              <h2 className="text-lg font-semibold">
                {user.username || "Ten dang nhap"}
              </h2>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-bold bg-yellow-300 text-black text-center py-2">
              <p>C'Friends</p>
            </div>
            <p className="my-2">Tích điểm C'Friends</p>
            <div className="w-full h-2 bg-gray-300 rounded-full my-2">
              <div className="bg-yellow-400 h-2 rounded-full w-[50%]"></div>
            </div>
            <p className="text-sm">0/10K</p>
          </div>
          <ul className="mt-6 space-y-2">
            <a className="flex m-3" onClick={setTabInfo}>
              <img
                className="mr-3"
                src={UserIcon}
                alt="user"
                width={16}
                height={16}
              />
              Thông tin khách hàng
            </a>

            <a className="flex m-3" onClick={setTabHistory}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Lịch sử mua hàng
            </a>
          </ul>
          <div className="flex mt-8 ml-2 text-gray-200 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M10 21V20.25V21ZM9 21V21.75V21ZM3 15H3.75H3ZM3 9H2.25H3ZM9 3V2.25V3ZM10 3V3.75V3ZM3.06156 7.21783L2.32079 7.1005L2.32079 7.1005L3.06156 7.21783ZM7.21783 3.06156L7.33515 3.80232L7.21783 3.06156ZM7.21783 20.9384L7.1005 21.6792H7.1005L7.21783 20.9384ZM3.06156 16.7822L2.32079 16.8995L2.32079 16.8995L3.06156 16.7822ZM13.4504 20.6C13.7816 20.3513 13.8484 19.8811 13.5997 19.5499C13.3509 19.2187 12.8808 19.1519 12.5496 19.4007L13.4504 20.6ZM12.5496 4.59931C12.8808 4.84808 13.3509 4.78126 13.5997 4.45007C13.8484 4.11888 13.7816 3.64873 13.4504 3.39996L12.5496 4.59931ZM7 11.25C6.58579 11.25 6.25 11.5858 6.25 12C6.25 12.4142 6.58579 12.75 7 12.75V11.25ZM20 12V12.75V12ZM17.466 7.41232C17.1414 7.15497 16.6697 7.20946 16.4123 7.53403C16.155 7.8586 16.2095 8.33034 16.534 8.58768L17.466 7.41232ZM18.763 9.39785L19.2289 8.81016L18.763 9.39785ZM18.763 14.6022L19.2289 15.1898L18.763 14.6022ZM16.534 15.4123C16.2095 15.6697 16.155 16.1414 16.4123 16.466C16.6697 16.7905 17.1414 16.845 17.466 16.5877L16.534 15.4123ZM20.9801 11.7493L21.7208 11.6313V11.6313L20.9801 11.7493ZM20.9801 12.2507L21.7208 12.3687V12.3687L20.9801 12.2507ZM21 12H21.75H21ZM10 20.25H9V21.75H10V20.25ZM3.75 15L3.75 9H2.25L2.25 15H3.75ZM9 3.75L10 3.75V2.25L9 2.25V3.75ZM3.75 9C3.75 8.04233 3.75233 7.65082 3.80232 7.33515L2.32079 7.1005C2.24767 7.56216 2.25 8.09965 2.25 9H3.75ZM9 2.25C8.09966 2.25 7.56216 2.24767 7.1005 2.32079L7.33515 3.80232C7.65082 3.75233 8.04233 3.75 9 3.75V2.25ZM3.80232 7.33515C4.09035 5.51661 5.51661 4.09035 7.33515 3.80232L7.1005 2.32079C4.64012 2.71048 2.71048 4.64012 2.32079 7.1005L3.80232 7.33515ZM9 20.25C8.04233 20.25 7.65082 20.2477 7.33515 20.1977L7.1005 21.6792C7.56216 21.7523 8.09965 21.75 9 21.75V20.25ZM2.25 15C2.25 15.9003 2.24767 16.4378 2.32079 16.8995L3.80232 16.6648C3.75233 16.3492 3.75 15.9577 3.75 15H2.25ZM7.33515 20.1977C5.51661 19.9096 4.09035 18.4834 3.80232 16.6648L2.32079 16.8995C2.71048 19.3599 4.64012 21.2895 7.1005 21.6792L7.33515 20.1977ZM10 21.75C11.2936 21.75 12.4894 21.3219 13.4504 20.6L12.5496 19.4007C11.8393 19.9342 10.9576 20.25 10 20.25V21.75ZM10 3.75C10.9576 3.75 11.8393 4.06583 12.5496 4.59931L13.4504 3.39996C12.4894 2.67806 11.2936 2.25 10 2.25V3.75ZM7 12.75L20 12.75V11.25L7 11.25V12.75ZM16.534 8.58768L18.297 9.98553L19.2289 8.81016L17.466 7.41232L16.534 8.58768ZM18.297 14.0145L16.534 15.4123L17.466 16.5877L19.2289 15.1898L18.297 14.0145ZM18.297 9.98553C19.0143 10.5543 19.5012 10.9418 19.8289 11.2682C20.1532 11.5913 20.2225 11.7612 20.2395 11.8673L21.7208 11.6313C21.6294 11.0582 21.2932 10.6096 20.8875 10.2055C20.4852 9.80475 19.9176 9.35616 19.2289 8.81016L18.297 9.98553ZM19.2289 15.1898C19.9175 14.6438 20.4852 14.1953 20.8875 13.7945C21.2932 13.3904 21.6294 12.9418 21.7208 12.3687L20.2395 12.1327C20.2225 12.2388 20.1532 12.4087 19.8289 12.7318C19.5012 13.0582 19.0143 13.4457 18.297 14.0145L19.2289 15.1898ZM20.2395 11.8673C20.2465 11.9117 20.25 11.9559 20.25 12H21.75C21.75 11.8766 21.7402 11.7534 21.7208 11.6313L20.2395 11.8673ZM20.25 12C20.25 12.0441 20.2465 12.0883 20.2395 12.1327L21.7208 12.3687C21.7402 12.2466 21.75 12.1234 21.75 12H20.25ZM20 12.75H21V11.25H20V12.75Z"
                fill="#9C9C9C"
              />
            </svg>
            <button className="ml-3 text-sm" onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        </div>

        {/* ----------CONTENT--------- */}

        <div className={`${tab ? "block w-3/4 pl-8" : "hidden"}`}>
          <h1 className="text-2xl font-bold text-white">
            THÔNG TIN KHÁCH HÀNG
          </h1>

          <div className="bg-white rounded-lg p-6 mt-6 shadow-md">
            <h2 className="text-lg font-bold">Thông tin cá nhân</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 p-2 border-2 rounded"
                  value={email || ""}
                  placeholder={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button
              className="mt-4 bg-gray-200  py-2 px-4 rounded font-bold"
              onClick={handleChangeInfo}
            >
              LƯU THÔNG TIN
            </button>
          </div>

          <div className="bg-white rounded-lg p-6 mt-6 shadow-md">
            <h2 className="text-lg font-bold">Đổi mật khẩu</h2>
            <div className="grid gap-4 mt-4">
              <div>
                <label className="block text-gray-700">Mật khẩu cũ *</label>
                <input
                  type="password"
                  className="w-full mt-1 p-2 border rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <label className="block text-gray-700">Mật khẩu mới *</label>
                <input
                  type="password"
                  className="w-full mt-1 p-2 border rounded"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                ></input>
              </div>
              <div>
                <label className="block text-gray-700">
                  Xác thực mật khẩu *
                </label>
                <input
                  type="password"
                  className="w-full mt-1 p-2 border rounded"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                ></input>
              </div>
            </div>
            <button
              className="mt-4 bg-gray-200  py-2 px-4 rounded font-bold"
              onClick={changePassword}
            >
              ĐỔI MẬT KHẨU
            </button>
          </div>
        </div>

        {/* CONTENT LICH SU */}
        <div className={`${tab ? "hidden" : "block w-3/4 pl-8"}`}>
          <h1 className="text-2xl  text-white font-bold mb-6">
            LỊCH SỬ MUA HÀNG
          </h1>
          <div className="grid grid-cols-4 items-center text-white border-collapse border border-white w-full bg-cinestar-custom-blue p-2">
            {/* Header */}
            <div className="font-bold text-center">Phim</div>
            <div className="font-bold text-center">Thời gian</div>
            <div className="font-bold text-center">Tổng tiền</div>
            <div className="font-bold basis-[12%] text-center">Chi tiết vé</div>

            {/* Body */}
            {newTicketList.map((ticket, index) => (
              <React.Fragment key={index}>
                <div className="border-t border-white text-center py-2">
                  {ticket.filmName}
                </div>
                <div className="border-t border-white text-center py-2">
                  {ticket.showTime}
                </div>
                <div className="border-t border-white text-center py-2">
                  {ticket.baseAmount.toLocaleString()} VND
                </div>
                <div className="border-t border-white text-center py-2 flex items-center justify-center">
                  <button
                    className="hover:opacity-80"
                    onClick={() => {
                      showDetail(ticket.id);
                      setIsShowModal(true);
                    }}
                  >
                    {ticket.detailTicket}
                  </button>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {isShowModal && (
        <DetailTickelModal
          ticketId = {ticketId}
          isShowModal={isShowModal}
          setIsShowModal={setIsShowModal}
        />
      )}
    </div>
  );
};

export default UserPage;
