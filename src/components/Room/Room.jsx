import React, { useMemo, useState } from "react";
import { Screen } from "../../assets";
import { room, roomDetail } from "../../constants/roomTest";
import Seat from "./Seat";

const Room = ({ roomNum, seats }) => {
  // console.log(roomNum);
  console.log(seats);
  const room = roomDetail.find((room) => room.id === roomNum);
  const rows = room.rows;
  const cols = room.cols;
  const rowsCount = rows.length;
  const colsCount = cols.reduce((a, b) => Math.max(a, b), -Infinity);
  // console.log(cols);
  // console.log("rows: ", rowsCount);
  // console.log("cols: ", colsCount);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const getSeatsArray = useMemo(() => {
    let seats = [];

    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j <= cols[i]; j++) {
        let seatNumber = rows[i] + (j < 10 ? "0" + j : j);
        seats.push(seatNumber);
      }
    }
    return seats;
  }, [seats]);

  const handleChoice = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatNumber)) {
        return prevSelectedSeats.filter((seat) => seat !== seatNumber);
      } else {
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };

  return (
    <div className="flex flex-col gap-5 justify-center">
      {/* Screen */}
      <div className="flex m-auto relative">
        <img src={Screen} alt="" />
        <span className="text-3xl font-bold text-white absolute top-0 left-[50%] translate-x-[-50%] translate-y-[50%]">
          Màn hình
        </span>
      </div>
      {/* Content */}
      <div className="w-[60%] flex m-auto ">
        <div
          className={`grid gap-y-4 justify-items-center items-center w-full`}
          style={{
            gridTemplateColumns: `repeat(${colsCount}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rowsCount}, minmax(0, 1fr))`,
          }}
        >
          {getSeatsArray.map((seat) => (
            <Seat
              key={seat}
              seatNumber={seat}
              isBooked={seats[seat]?.isBooked || false} // Từ dữ liệu đổ xuống
              isSelected={selectedSeats.includes(seat)}
              isCouple={seats[seat]?.isCouple || false}
              onClick={() => handleChoice(seat)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Room;
