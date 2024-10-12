import React, { useContext, useEffect, useState } from "react";
import { schedule } from "../../constants/scheduleTest";
import { useParams } from "react-router-dom";
import SeatBooking from "../SeatBooking/SeatBooking";

const MovieSchedule = () => {
  const { id } = useParams();
  // Filter date
  const listDay = schedule.filter((item) => {
    return item.id === id;
  });
  // Filter time
  const [day, setDay] = useState(listDay[0].date);
  const listTime = listDay.find((item) => item.date === day);
  const [time, setTime] = useState();
  console.log(time);

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
      <div className="bg-cinestar-purple space-x-4 flex justify-center p-8 rounded-md">
        {listTime.showTime.map((item, index) => (
          <div
            key={index}
            onClick={() => setTime(item)}
            className={`border hover:border-cinestar-gold  hover:text-cinestar-gold rounded-md cursor-pointer p-2 w-[60px] text-center ${
              time === item
                ? "text-cinestar-gold border-cinestar-gold"
                : "border-white text-white"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      {/* Chọn ghế */}
      {day && time && <SeatBooking />}
    </div>
  );
};

export default MovieSchedule;
