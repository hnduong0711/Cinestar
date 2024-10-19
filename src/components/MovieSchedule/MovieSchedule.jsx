import React, { useContext, useEffect, useMemo, useState } from "react";
import { schedule } from "../../constants/scheduleTest";
import { useLocation, useParams } from "react-router-dom";
import SeatBooking from "../SeatBooking/SeatBooking";
import SearchContext from "../../context/SearchContext/SearchContext";

const MovieSchedule = () => {
  const { id } = useParams();
  const { searchData, setSearchData } = useContext(SearchContext);

  // Filter date
  const listDay = useMemo(() => {
    return schedule.filter((item) => {
      return item.id === Number(id);
    });
  }, [id]);

  // Filter time
  const [day, setDay] = useState(
    searchData.date.split(":")[0] || `${listDay[0].date}: ${listDay[0].dow}`
  );

  const listTime = useMemo(() => {
    return listDay.find((item) => item.date === day.split(":")[0]);
  }, [day, listDay]);
  const [time, setTime] = useState(searchData.time);

  console.log("day: ", day);
  console.log("time: ", time);
  console.log(searchData);

  const handleChangeData = (item, flag) => {
    if (flag) {
      setDay(item);
      setTime(null);
      setSearchData((prevData) => ({
        ...prevData,
        date: item, // Sử dụng item trực tiếp
      }));
    } else {
      setTime(item);
      setSearchData((prevData) => ({
        ...prevData,
        time: item, // Sử dụng item trực tiếp
      }));
    }
  };

  useEffect(() => {
    if (day && time) {
      const element = document.getElementById("hear");
      if (element) {
        element.scrollIntoView({ behavior: "smooth"});
      }
    }
  }, [day, time]);

  return (
    <div className="space-y-8">
      <div className="heading text-white text-center">lịch chiếu</div>
      {/* Ngày chiếu */}
      <div className="flex space-x-2 justify-center">
        {listDay.map((item, index) => (
          <div
            onClick={() => handleChangeData(`${item.date}: ${item.dow}`, true)}
            key={index}
            className={`flex flex-col border border-cinestar-gold/70 text-cinestar-gold font-content w-28 py-7 rounded-md cursor-pointer ${
              day.split(":")[0] === item.date
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
            onClick={() => handleChangeData(item.time, false)}
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
      {/* Div cần chuyển hướng tới */}
      <div id="hear"></div>
      {day && time && <SeatBooking />}
    </div>
  );
};

export default MovieSchedule;
