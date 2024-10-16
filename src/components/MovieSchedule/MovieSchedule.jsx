import React, { useContext, useMemo, useState } from "react";
import { schedule } from "../../constants/scheduleTest";
import { useParams } from "react-router-dom";
import SeatBooking from "../SeatBooking/SeatBooking";
import TicketContext from "../../context/TickerContext/TicketContext";

const MovieSchedule = () => {
  const { id } = useParams();
  // Context
  const { ticketData } = useContext(TicketContext);

  // Filter date
  const listDay = useMemo(() => {
    return schedule.filter((item) => item.id === id);
  }, [id]);

  console.log("re-render");

  // Filter time
  const [day, setDay] = useState(listDay[0].date);
  const listTime = useMemo(() => {
    return listDay.find((item) => item.date === day);
  }, [day, listDay]);
  const [time, setTime] = useState();

  return (
    <div className="space-y-8">
      <div className="heading text-white text-center">lịch chiếu</div>
      {/* Ngày chiếu */}
      <div className="flex space-x-2 justify-center">
        {listDay.map((item, index) => (
          <div
            onClick={() => setDay(item.date)}
            key={index}
            className={`flex flex-col border border-cinestar-gold/70 text-cinestar-gold font-content w-28 py-7 rounded-md cursor-pointer ${
              day === item.date
                ? "bg-cinestar-gold text-cinestar-purple/90 font-bold"
                : ""
            }`}
          >
            <div className="text-center text-xl">{item.date}</div>
            <div className="text-center">{item.dow}</div>
          </div>
        ))}
      </div>
      {/* Thời gian chiếu */}
      <div className="heading text-white text-center">Thời gian chiếu</div>
      <div className="bg-purple-blue-gradient space-x-4 flex justify-center p-8 rounded-md">
        {listTime.showTime.map((item, index) => (
          <div
            key={index}
            onClick={() => setTime(item.time)}
            className={`border hover:border-cinestar-gold  hover:text-cinestar-gold rounded-md cursor-pointer p-2 w-[60px] text-center transition-all duration-200 ${
              time === item.time
                ? "text-cinestar-black bg-cinestar-gold border-2 font-bold"
                : "border-white text-white"
            }`}
          >
            {item.time}
          </div>
        ))}
      </div>
      {/* Chọn ghế */}
      {day && time && <SeatBooking />}
    </div>
  );
};

export default MovieSchedule;
