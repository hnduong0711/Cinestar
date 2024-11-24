import React, { useEffect, useState } from "react";
import { Screen } from "../../assets";
import Seat from "./Seat";
// import { filmList } from "../../constants/movie";
import TicketContext from "../../context/TicketContext/TicketContext";
import { seatService } from "../../api/reservationService";
import scheduleService from "../../api/scheduleService";

const Room = ({ seatQuantity, schedule }) => {
  const [seats, setSeats] = useState([]);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  console.log('seatQuan in room: ', seatQuantity);
  
  

  // lấy dữ liệu ghế
  useEffect(() => {
    const fetchData = async () => {
      const data = await scheduleService.getScheduleByIdSchedule(schedule.id);
      setSeats(data["seatInfo"]["allSeats"]);
      setBookedSeats(data["seatInfo"]["bookedSeat"])
    };
    fetchData();
  }, [schedule.roomNumber]);

  // console.log('seat', seats);
  // console.log('booked ', bookedSeats);
  
  

  // lấy số hàng
  const uniqueRow = [...new Set(seats.map((item) => item.row))];
  useEffect(() => {
    setRows(uniqueRow.length);
  }, [uniqueRow]);

  // lấy số cột
  const maxColsPerRow = seats.reduce((acc, seat) => {
    const row = seat.row;
    const column = parseInt(seat.column);
    const seatType = seat.seatType;
    if (!acc[row]) acc[row] = 0;
    acc[row] = Math.max(acc[row], column + (seatType === "couple" ? 1 : 0));
    return acc;
  }, {});
  // tìm số cột tối đa trong tất cả các hàng
  const maxCols = Math.max(...Object.values(maxColsPerRow));
  useEffect(() => {
    setCols(maxCols);
  }, [maxColsPerRow]);

  const bookedSeatKeys = new Set(
    bookedSeats.map((seat) => `${seat.row}-${seat.column}`)
  );

  // console.log(seats);
  // console.log('booked ',bookedSeats);

  // chọn ghế
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
      <div className="sm:w-full md:w-[90%] lg:w-[85%] flex m-auto">
        <div
          className={`grid gap-y-4 gap-x-2 justify-items-center items-center w-full`}
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
        >
          {seats.map((seat) => (
            <Seat
              key={seat.row + seat.column}
              seatNumber={seat.row + (seat.column < 10 ? "0"+seat.column : seat.column)}
              isBooked={bookedSeatKeys.has(`${seat.row}-${seat.column}`)}
              isSelected={selectedSeats.includes(seat)}
              isCouple={seat.seatType === "couple"}
              isNone = {seat.seatType === "none"}
              onClick={() => handleChoice(seat)}
            />
          ))}
        </div>
      </div>
      {/* Test */}
      {/* <div className="">
        <div
          className={`grid gap-y-4 gap-x-2 justify-items-center items-center w-full`}
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
        >
          <div
            className="bg-red-300"
            onClick={() => {
              console.log();
            }}
          >
            A
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Room;
