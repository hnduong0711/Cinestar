import React, { useContext, useState } from "react";
import { typeTikcet } from "../../constants/seatBooking";
import Room from "../Room/Room";
import TicketContext from "../../context/TicketContext/TicketContext";

const SeatBooking = ({schedule}) => {
  const { setTicketData, searchData } = useContext(TicketContext);
  const [seatQuantity, setSeatQuantity] = useState([]);

  
  // console.log('search data in SB: ',searchData);
  // console.log('schedule', schedule);
  

  // Cập nhật số lượng ghế trong vé
  const handleUpdate = (id, type, newQuantity) => {
    setSeatQuantity((prevSeatQuantity) => {
      // Kiểm tra xem vé có tồn tại trong state chưa
      const existingTicket = prevSeatQuantity.find(
        (ticket) => ticket.id === id
      );

      if (existingTicket) {
        // Nếu đã có, cập nhật số lượng
        return prevSeatQuantity.map((ticket) =>
          ticket.id === id ? { ...ticket, soLuong: newQuantity } : ticket
        );
      } else {
        // Nếu chưa có, thêm vé mới vào
        return [...prevSeatQuantity, { id, type, soLuong: newQuantity }];
      }
    });
  };
  console.log('seatQuan in SeatBooking', seatQuantity);
  // Tăng số lượng ghế trong vé
  const handleIncrease = (id, type) => {
    const currentTicket = seatQuantity.find((ticket) => ticket.id === id);
    const newQuantity = currentTicket ? currentTicket.soLuong + 1 : 1;
    handleUpdate(id, type, newQuantity);
  };
  // Giảm số lượng ghế trong vé
  const handleDecrease = (id, type) => {
    const currentTicket = seatQuantity.find((ticket) => ticket.id === id);
    const newQuantity =
      currentTicket && currentTicket.soLuong > 0
        ? currentTicket.soLuong - 1
        : 0;
    handleUpdate(id, type, newQuantity);
  };
  

  return (
    <div className="flex flex-col">
      {/* Chọn số lượng ghế */}
      <div className="flex flex-col items-center gap-10 w-full">
        <div className="heading text-white text-ceter">Chọn loại vé</div>
        <div className="grid lg:grid-cols-3 grid-rows-1 gap-5 w-full pb-20">
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
                    {ticket.type}
                  </div>
                  <div className="uppercase text-white">
                    {ticket.isSpecial ? schedule.singleSeatPrice/2 : ticket.type === "Đơn" ? schedule.singleSeatPrice : schedule.coupleSeatPrice} vnd
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
      {searchData.time && <Room seatQuantity={seatQuantity} schedule={schedule}/>}
      {/* Chọn bắp nước */}
      {/* <ListCombo onSelectCombos={onSelectCombos} /> */}
      {/* Thanh toán */}
      {/* <CheckOutFood /> */}
    </div>
  );
};

export default SeatBooking;
