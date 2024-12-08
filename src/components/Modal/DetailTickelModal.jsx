import { XMarkIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import ticketService from "../../api/ticketService";
import { schedule } from "../../constants/scheduleTest";

const DetailTickelModal = ({ ticketId, isShowModal, setIsShowModal }) => {
  const [detailTicket, setDetailTicket] = useState();
  // load data detail của 1 ticket
  useEffect(() => {
    const fetchData = async () => {
      const { token } = JSON.parse(sessionStorage.getItem("authToken"));
      const response = await ticketService.getTicketById(ticketId, token);
      console.log("detail ", response);

      setDetailTicket(response);
    };
    fetchData();
  }, []);

  if (!detailTicket) {
    return <div>Loading...</div>; // Hiển thị loading hoặc placeholder khi chưa có dữ liệu
  }

  const formatDateTime = (dateTimeString) => {
    const [date, time] = dateTimeString.split("T");
    const formattedDate = date.split("-").reverse().join("/");
    const formattedTime = time.slice(0, 5);
    return `${formattedTime} | ${formattedDate}`;
  };

  const { ticket, movieSchedule } = detailTicket;
  console.log("detail ticket: ", ticket);
  console.log(movieSchedule);

  return (
    <div
      className={`transition-all duration-500 ease-in-out overflow-hidden${
        isShowModal ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-30"
      }`}
    >
      {isShowModal && (
        <div className="rounded-md bg-cinestar-custom-blue flex flex-col m-auto absolute top-[150px] w-[60%] p-5 left-1/2 -translate-x-1/2 border border-white">
          <div className="">
            <div className="text-5xl font-title text-center text-white">Chi tiết vé</div>
            <XMarkIcon
              className="size-7 mt-5  hover:opacity-75 cursor-pointer border border-black rounded-full absolute right-2 top-2"
              onClick={() => setIsShowModal(false)}
            />
          </div>
          {/* Thông tin vé */}
          <div className="rounded-md bg-cinestar-custom-blue text-white flex flex-col p-8 gap-3">
            <div className="uppercase text-2xl font-bold">
              {movieSchedule.movie.name}
            </div>
            <div className="flex flex-col">
              <div className="text-cinestar-gold font-bold">Thời gian</div>
              <span>
                {formatDateTime(movieSchedule.showTime)}
              </span>
            </div>
            <div className="flex justify-around">
              <div className="flex flex-col text-center">
                <div className="text-cinestar-gold font-bold">Số phòng</div>
                <div className="">{movieSchedule.roomNumber}</div>
              </div>
              <div className="flex flex-col text-center">
                <div className="text-cinestar-gold font-bold">Số vé</div>
                <div className="">{ticket.seatDetail.length}</div>
              </div>
            </div>
            <div className="">
              <span className="text-cinestar-gold font-bold">Số ghế:</span>{" "}
              {ticket.seatDetail.map((seat, index) => (
                <span key={index} className="">
                  {index > 0 && ", "} {seat.row + seat.column}
                </span>
              ))}
            </div>
            <div className="">
              <span className="text-cinestar-gold font-bold">Bắp nước:</span>{" "}
              { ticket.foodDetail ? (ticket.foodDetail.map((food, index) => (
                <span key={index} className="">
                  {index > 0 && ", "} {food.name}
                </span>
              ))) : "Không có"}
            </div>
            <div className="text-cinestar-gold font-bold">Trạng thái: <span className="text-white">{ticket.status === "processed" ? "Đã thanh toán": "Chưa thanh toán"}</span></div>
            <div className="text-center">------------------------------</div>
            <div className="uppercase py-4 flex justify-between text-xl">
              Tổng tiền:{" "}
              <span className="text-cinestar-gold font-bold">{ticket.totalAmount}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailTickelModal;
