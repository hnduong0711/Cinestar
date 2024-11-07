import React, { useContext, useEffect, useMemo, useState } from "react";
import { Screen } from "../../assets";
import { rooms, seatInRoom } from "../../constants/roomTest";
import Seat from "./Seat";
import { schedule } from "../../constants/scheduleTest";
import { filmList } from "../../constants/movie";
import TicketContext from "../../context/TicketContext/TicketContext";

const Room = ({ roomNum, seats }) => {
  const { searchData } = useContext(TicketContext);

  console.log("search data in Room: ", searchData);

  // Lấy số phòng
  const getRoom = () => {
    const film = filmList.find((item) => item.name === searchData.film);
    // console.log('id film: ', film );
    const selectedFilm = schedule.filter((item) => item.id === film.id);
    if (!selectedFilm) return null;
    // console.log('selected film: ', selectedFilm);
    const selectedDay = selectedFilm.find(
      (item) => item.date === searchData.date
    );
    // console.log('seleced day: ',selectedDay);
    if (!selectedDay) return null;
    const selectedTime = selectedDay.showTime.find(
      (show) => show.time === searchData.time
    );
    // console.log('seleced time: ',selectedTime);
    if (!selectedTime) return null;
    return selectedTime.room;
  };

  useEffect(() => {
    if (searchData.time) {
      getRoom(); // Chỉ gọi getRoom khi time có giá trị hợp lệ
    }
  }, [searchData.time]);

  const room = rooms.find((room) => room.room === getRoom());

  console.log("room: ", room);

  const rows = room.rows;
  const cols = room.cols;

  console.log("rows & cols: ", rows, cols);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const getSeatByRoom = useMemo(() => {
    return seatInRoom.filter((seat) => {
      return seat.room === getRoom();
    });
  }, []);

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
          {getSeatByRoom.map((seat) => (
            <Seat
              key={seat.row + seat.col}
              seatNumber={seat.row + seat.col}
              isBooked={seat.isBooked || false} // Từ dữ liệu đổ xuống
              isSelected={selectedSeats.includes(seat)}
              isCouple={seat.type === "couple"}
              onClick={() => handleChoice(seat)}
            />
          ))}
        </div>
      </div>
      {/* Test */}
      <div className="">
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
      </div>
    </div>
  );
};

export default Room;
