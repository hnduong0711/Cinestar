import React from "react";
import { Screen } from "../../assets";
import { room, roomDetail } from "../../constants/roomTest";
import Seat from "./Seat";

const Room = ({ roomNum, seats }) => {
  // console.log(roomNum);
  console.log(seats);
  const room = roomDetail.find((room) => room.id === roomNum);
  const rows = room.rows;
  const cols = room.cols;
  console.log('rows: ',rows.length);
  console.log('cols: ',cols[0]);
  
  

  const getSeatsArray = () => {
    let seats = [];
    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j <= cols[i]; j++) {
        // Tạo chuỗi theo dạng A01, A02... bằng cách thêm 0 vào trước các số có 1 chữ số
        let seatNumber = rows[i] + (j < 10 ? "0" + j : j);
        seats.push(seatNumber);
      }
    }
    return seats;
  };

  console.log(getSeatsArray());
  
  return (
    <div className="flex flex-col gap-5 justify-center">
      {/* Screen */}
      <div className="flex m-auto relative">
        <img src={Screen} alt="" />
        <span className="text-3xl font-bold text-white absolute top-0 left-[50%] translate-x-[-50%] translate-y-[50%]">Màn hình</span>
      </div>
      {/* Content */}
      <div className={`grid grid-cols-${cols[0]} grid-rows-${rows.length} gap-2`}>
        {
          getSeatsArray().map((seat) => (
            <Seat seatNumber={seat} isBooked={false} isSelected={false} />
          ))
        }
      </div>
    </div>
  );
};

export default Room;
