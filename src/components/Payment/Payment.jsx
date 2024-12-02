import React, { useContext, useState } from "react";
import TicketContext from "../../context/TicketContext/TicketContext";
import { ArrowLongRightIcon } from "@heroicons/react/16/solid";

const Payment = ({ timeLeft }) => {
  const { token } = JSON.parse(sessionStorage.getItem("authToken"));
  const [isLogged, setIsLogged] = useState(token ? true : false);
  const { ticket, searchData, ticketData } = useContext(TicketContext);

  return (
    <div className="w-full h-full flex flex-col flex-wrap pt-[9rem] px-4 pb-5">
      <div className="uppercase text-3xl text-white font-content font-bold py-4">
        Trang thanh toán
      </div>
      {/* Progress */}
      <div className="uppercase text-white font-content text-[16px] flex font-bold">
        <div className={`text-center p-2 ${isLogged ? "" : "text-cinestar-gold"}`}>
          <div className="">1</div>
          <div className="">thông tin khách hàng</div>
        </div>
        <div className="">
          <ArrowLongRightIcon className="size-10" />
        </div>
        <div className={`text-center p-2 ${isLogged ? "" : ""}`}>
          <div className="">2</div>
          <div className="">phương thức thanh toán</div>
        </div>
        <div className="">
          <ArrowLongRightIcon className="size-10" />
        </div>
        <div className="text-center p-2">
          <div className="">3</div>
          <div className="">thanh toán</div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        {/* Thay đổi nội dung */}
        <div className="">
            
        </div>
        {/* Thông tin vé */}
        <div className="rounded-md bg-cinestar-blue text-white flex flex-col p-8 gap-3">
          <div className="uppercase text-2xl font-bold">{searchData.film}</div>
          <div className="">{searchData.theater}</div>
          <div className="flex flex-col">
            <div className="text-cinestar-gold">Thời gian</div>
            <span>
              {searchData.time} {searchData.date}
            </span>
          </div>
          <div className="flex justify-around">
            <div className="flex flex-col text-center">
              <div className="text-cinestar-gold">Số phòng</div>
              <div className="">{ticketData.room}</div>
            </div>
            <div className="flex flex-col text-center">
              <div className="text-cinestar-gold">Số vé</div>
              <div className="">{ticketData.seats.length}</div>
            </div>
          </div>
          <div className="">
            <span className="text-cinestar-gold">Số ghế:</span>{" "}
            {ticketData.seats.map((seat, index) => (
              <span key={index} className="">
                {index > 0 && ", "} {seat.row + seat.column}
              </span>
            ))}
          </div>
          <div className="">
            <span className="text-cinestar-gold">Bắp nước:</span>{" "}
            {ticketData.foods.map((food, index) => (
              <span key={index} className="">
                {index > 0 && ", "} {food.name}
              </span>
            ))}
          </div>
          <div className="text-center">------------------------------</div>
          <div className="uppercase py-4 flex justify-between text-xl">số tiền cần thanh toán: <span className="text-cinestar-gold">90000</span></div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
