import React, { useEffect } from "react";
import { schedule } from "../../constants/scheduleTest";
import { useParams } from "react-router-dom";

const MovieSchedule = () => {
  const { id } = useParams();
  const listDay = schedule.filter((item) => {
    return item.id === id;
  });

  return (
    <div className="space-y-8">
      <div className="heading text-white text-center">lịch chiếu</div>
      {/* Ngày chiếu */}
      <div className="flex space-x-2">
        {listDay.map((item, index) => (
          <div
            key={index}
            className="flex flex-col border border-cinestar-gold/70 text-cinestar-gold font-content w-28 py-7 rounded-md"
          >
            <div className="text-center">{item.date}</div>
            <div className="text-center">{item.dow}</div>
          </div>
        ))}
      </div>
      {/* Thời gian chiếu */}
      <div className="heading text-white text-center">Thời gian chiếu</div>
      <div className="bg-cinestar-purple space-x-4 flex justify-center p-8 rounded-md">
        <div className={`border border-cinestar-gold text-cinestar-gold rounded-md p-2`}>12:10</div>
        <div className={`border border-cinestar-gold text-cinestar-gold rounded-md p-2`}>12:10</div>
        <div className={`border border-cinestar-gold text-cinestar-gold rounded-md p-2`}>12:10</div>
      </div>
    </div>
  );
};

export default MovieSchedule;
