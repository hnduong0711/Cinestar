import React, { useContext, useEffect, useState } from "react";
import TicketContext from "../../context/TicketContext/TicketContext";
import Button from "../Button/Button";
import userService from "../../api/userService";
import paymentSerVice from "../../api/paymentService";

const Payment = ({ timeLeft }) => {
  const { ticket, searchData, ticketData } = useContext(TicketContext);
  const [user, setUser] = useState(null);
  const [agree, setAgree] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const { token } = JSON.parse(sessionStorage.getItem("authToken"));
      const { id } = JSON.parse(sessionStorage.getItem("username"));
      const response = await userService.getUser(id, token);
      setUser(response);
    };
    fetchData();
  }, []);

  const handlePayment = async () => {
    if (agree) {
      const { token } = JSON.parse(sessionStorage.getItem("authToken"));
      const data = {
        OrderType: "online",
        TicketID: ticket.id,
        Amount: 1,
        OrderDescription: ticket.id,
        Name: user.username,
        UserId: user.id,
      };
      const response = await paymentSerVice.createPayment(data, token);
      window.location.href = response;
    } else {
      alert("Vui lòng đồng ý điều khoản của Cinestar")
    }
  };

  return (
    user &&
    ticket && (
      <div className="w-full h-full flex flex-col flex-wrap pt-[9rem] px-4 pb-5">
        <div className="uppercase text-4xl text-white font-content font-bold py-6">
          Trang thanh toán
        </div>
        <div className="grid grid-cols-2">
          {/* Thay đổi nội dung */}
          <div className="flex flex-col gap-5 p-4">
            <div className="flex flex-wrap flex-col">
              <label for="" className="text-cinestar-gold text-[14px] pb-3">
                Họ và tên
              </label>
              <input
                type="text"
                className="rounded-md h-[40px] text-[18px] outline-none border-none pl-2"
                readOnly
                value={user.username}
              />
            </div>
            <div className="flex flex-wrap flex-col">
              <label for="" className="text-cinestar-gold text-[14px] pb-3">
                Email
              </label>
              <input
                type="text"
                className="rounded-md h-[40px] text-[18px] outline-none border-none pl-2"
                readOnly
                value={user.email}
              />
            </div>
            <div className="flex flex-col">
              <div className="text-cinestar-gold text-[14px] pb-3">
                Phương thức thanh toán
              </div>
              <select className="h-[40px] rounded-md pl-2">
                <option value="vnpay">VN Pay</option>
                <option value="momo">Momo</option>
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="size-4"
                checked
                onClick={(prev) => {
                  setAgree(!prev);
                }}
              />
              <span className="text-white">
                Bạn đã đồng ý với điều khoản của Cinestar
              </span>
            </div>
            <div className="flex justify-center w-full">
              <Button
                className="button md:button bg-cinestar-gold text-black w-[80%] h-[40px] mr-3 hidden group hover:text-white"
                text="Thanh toán"
                colorChange="bg-purple-blue-gradient"
                onClick={handlePayment}
              />
            </div>
          </div>
          {/* Thông tin vé */}
          <div className="rounded-md bg-cinestar-blue text-white flex flex-col p-8 gap-3">
            <div className="uppercase text-2xl font-bold">
              {searchData.film}
            </div>
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
            <div className="uppercase py-4 flex justify-between text-xl">
              số tiền cần thanh toán:{" "}
              <span className="text-cinestar-gold">{ticket.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Payment;
