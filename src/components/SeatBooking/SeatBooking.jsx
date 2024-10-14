import React, { useState } from "react";
import { typeTikcet } from "../../constants/seatBooking";
import CheckOut from "../CheckOut/CheckOut";
import ListCombo from "../../pages/BuyFood/CompoFirst";
import CheckOutFood from "../../pages/BuyFood/CheckOutFood";
import Room from "../Room/Room";

const SeatBooking = () => {
  const [ticket, setTicket] = useState();

  const handleIncrease = (id) => {
    setQuantities((prev) => {
      const newQuantity = (prev[id] || 0) + 1;
      updateSelectedCombos(id, newQuantity);
      return { ...prev, [id]: newQuantity };
    });
  };

  const handleDecrease = (id) => {
    setQuantities((prev) => {
      const newQuantity = Math.max((prev[id] || 0) - 1, 0);
      updateSelectedCombos(id, newQuantity);
      return { ...prev, [id]: newQuantity };
    });
  };

  return (
    <div className="flex flex-col">
      {/* Chọn số lượng ghế */}
      <div className="flex flex-col items-center gap-10 w-full">
        <div className="heading text-white text-ceter">Chọn loại vé</div>
        <div className="grid lg:grid-cols-3 grid-rows-3 gap-5 w-full">
          {typeTikcet.map((item) => (
            <div
              className="border border-slate-300 p-5 rounded-md flex justify-between items-center lg:block"
              key={item.id}
            >
              <div className="gap-5">
                <div className="uppercase text-white font-bold">
                  {item.name}
                </div>
                <div className="uppercase text-cinestar-gold">{item.type}</div>
                <div className="uppercase text-white">{item.textPrice} vnd</div>
              </div>
              <div className="flex lg:mt-12">
                {/* Thêm class group và hover:bg-yellow-500 */}
                <div className="group cursor-default flex hover:bg-cinestar-custom-yellow ">
                  <button
                    className="bg-gray-300 text-black w-[30px] h-[30px] group-hover:bg-cinestar-custom-yellow cursor-default"
                    onClick={() => handleDecrease(food.id)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    min="0"
                    value={ticket}
                    onChange={(e) =>
                      handleQuantityChange(food.id, e.target.value)
                    }
                    className="text-center w-[30px] h-[30px] bg-gray-300 group-hover:bg-cinestar-custom-yellow cursor-default" // Đặt kích thước bằng với nút
                    style={{
                      appearance: "none",
                      MozAppearance: "textfield",
                      WebkitAppearance: "none",
                    }} // Bỏ border và các mũi tên
                  />
                  <button
                    className="bg-gray-300 text-black w-[30px] h-[30px] group-hover:bg-cinestar-custom-yellow cursor-default"
                    onClick={() => handleIncrease(food.id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Chọn vị trí ghế */}
      <Room roomNum={1}/>
      {/* Chọn bắp nước */}
      {/* <ListCombo onSelectCombos={onSelectCombos} /> */}
      {/* Thanh toán */}
      {/* <CheckOutFood /> */}
    </div>
  );
};

export default SeatBooking;
