import React, { useContext, useEffect, useRef, useState } from "react";
import { typeTikcet } from "../../constants/seatBooking";
import Room from "../Room/Room";
import TicketContext from "../../context/TicketContext/TicketContext";
import BuyCorn from "../../pages/BuyFood/index";
import ListCombo from "../../pages/BuyFood/CompoFirst";
import CheckOutFood from "../../pages/BuyFood/CheckOutFood";

const SeatBooking = ({ schedule }) => {
  const { ticketData, setTicketData, searchData, ticket } =
    useContext(TicketContext);
  const typeTicketRef = useRef(null);
  const [foodCombo, setFoodCombo] = useState([]);

  // Cập nhật số lượng ghế trong vé
  const [seatQuantity, setSeatQuantity] = useState([]);

  useEffect(() => {
    setTicketData((prev) => ({
      ...prev,
      room: schedule.roomNumber,
    }));
  }, []);

  // Hàm cập nhật ghế
  const handleUpdate = (id, type, newQuantity) => {
    setSeatQuantity((prevSeatQuantity) => {
      // Nếu số lượng là 0, xóa ghế khỏi danh sách
      if (newQuantity === 0) {
        return prevSeatQuantity.filter((ticket) => ticket.id !== id);
      }

      // Kiểm tra xem vé có tồn tại không
      const existingTicket = prevSeatQuantity.find(
        (ticket) => ticket.id === id
      );

      if (existingTicket) {
        // Nếu tồn tại, cập nhật số lượng
        return prevSeatQuantity.map((ticket) =>
          ticket.id === id ? { ...ticket, soLuong: newQuantity } : ticket
        );
      } else {
        // Nếu chưa có, thêm ghế mới vào danh sách
        return [...prevSeatQuantity, { id, type, soLuong: newQuantity }];
      }
    });
  };

  // Hàm tăng số lượng ghế
  const handleIncrease = (id, type) => {
    const currentTicket = seatQuantity.find((ticket) => ticket.id === id);
    const newQuantity = currentTicket ? currentTicket.soLuong + 1 : 1;
    handleUpdate(id, type, newQuantity);
  };

  // Hàm giảm số lượng ghế
  const handleDecrease = (id, type) => {
    const currentTicket = seatQuantity.find((ticket) => ticket.id === id);
    const newQuantity = currentTicket ? currentTicket.soLuong - 1 : 0;
    setTicketData((prev) => ({
      ...prev,
      seats: [],
      foods: [],
    }));
    handleUpdate(id, type, Math.max(newQuantity, 0)); // Đảm bảo số lượng không âm
  };

  // format price
  function formatPrice(price) {
    return price.toLocaleString("vi-VN");
  }

  return (
    <div className="flex flex-col">
      {/* Chọn số lượng ghế */}
      <div
        ref={typeTicketRef}
        className="flex flex-col items-center gap-10 w-full"
      >
        <div className="heading text-white text-ceter">Chọn loại vé</div>
        <div className="grid lg:grid-cols-2 grid-rows-1 gap-5 w-full pb-20">
          {typeTikcet.map((ticket) => {
            const foundTicket = seatQuantity.find(
              (item) => item.id === ticket.id
            );
            const soLuong = foundTicket ? foundTicket.soLuong : 0;
            return (
              <div
                className="border border-slate-300 p-5 rounded-md flex justify-between items-center lg:block"
                key={ticket.id}
              >
                <div className="gap-5">
                  <div className="uppercase text-white font-bold">
                    {ticket.name}
                  </div>
                  <div className="uppercase text-cinestar-gold">
                    {ticket.type === "single" ? "Đơn" : "Đôi"}
                  </div>
                  <div className="uppercase text-white">
                    {ticket.type === "single"
                      ? formatPrice(schedule.singleSeatPrice)
                      : formatPrice(schedule.coupleSeatPrice)}
                    vnd
                  </div>
                </div>
                <div className="flex lg:mt-12">
                  <div className="group cursor-default flex bg-gray-300 hover:bg-cinestar-custom-yellow px-3 py-1 rounded-md">
                    <button
                      className=" text-black w-[24px] h-[24px] flex m-auto hover:bg-cinestar-purple hover:text-white rounded-full cursor-poiter transition-all duration-150"
                      onClick={() => handleDecrease(ticket.id, ticket.type)}
                    >
                      <span className="flex m-auto">-</span>
                    </button>
                    {/* Hiển thị số lượng */}
                    <input
                      type="text"
                      value={soLuong}
                      readOnly
                      className="text-center w-[30px] h-[30px] group-hover:bg-cinestar-custom-yellow bg-gray-300 cursor-default"
                    />
                    <button
                      className=" text-black w-[24px] h-[24px] flex m-auto hover:bg-cinestar-purple hover:text-white rounded-full cursor-poiter transition-all duration-150"
                      onClick={() => handleIncrease(ticket.id, ticket.type)}
                    >
                      <span className="flex m-auto">+</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Chọn vị trí ghế */}
      {searchData.time && (
        <Room
          seatQuantity={seatQuantity}
          schedule={schedule}
          setSeatQuantity={setSeatQuantity}
          typeTicketRef={typeTicketRef}
          foodCombo={foodCombo}
        />
      )}
      {/* Chọn bắp nước */}
      {seatQuantity.length > 0 && <ListCombo onSelectCombos={setFoodCombo} />}
      {/* Thanh toán */}
      {ticket && (
        <CheckOutFood
          selectedCombos={foodCombo}
          selectedSeats={seatQuantity}
          schedule={schedule}
        />
      )}
    </div>
  );
};

export default SeatBooking;
