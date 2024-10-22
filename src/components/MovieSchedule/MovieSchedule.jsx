import React, { useContext, useEffect, useMemo, useState } from "react";
import { schedule } from "../../constants/scheduleTest";
import { useLocation, useParams } from "react-router-dom";
import SeatBooking from "../SeatBooking/SeatBooking";
import TicketContext from "../../context/TicketContext/TicketContext";
import { listTheater } from "../../constants/searchbox";

const MovieSchedule = () => {
  const { id } = useParams();

  const { searchData, setSearchData } = useContext(TicketContext);

  // Lọc ra ngày dưới dạng DD/MM
  const listDay = useMemo(() => {
    return schedule.filter((item) => {
      return item.id === Number(id);
    });
  }, [id]);

  // Lọc ra thời gian từ ngày
  const [day, setDay] = useState(
    searchData.date ? searchData.date : `${listDay[0].date}`
  );

  const listTime = useMemo(() => {
    return day ? listDay.find((item) => item.date === day) : [];
  }, [searchData, day, listDay]);

  const [time, setTime] = useState(null);

  useEffect(() => {
    if (listTime && listTime.showTime.length > 0) {
      const defaultTime = searchData.time || listTime.showTime[0].time;
      setTime(defaultTime);
      setSearchData((prevData) => ({
        ...prevData,
        date: day,
        time: defaultTime
      }));
    }
  }, [listTime, day, searchData.time, setSearchData]);

  const handleChangeData = (item, flag) => {
    if (flag) {
      setDay(item);
      setSearchData((prevData) => ({
        ...prevData,
        date: item,
        time: null
      }));
    } else {
      setTime(item);
      setSearchData((prevData) => ({
        ...prevData,
        time: item,
      }));
    }
  };

  console.log("day: ", day);
  console.log("time: ", time);
  console.log("search date:", searchData.date);
  console.log("list day: ", listDay);
  console.log("list time: ", listTime);
  console.log("search date in MS: ", searchData);
  console.log(time);

  return (
    <div className="space-y-8">
      <div className="heading text-white text-center">lịch chiếu</div>
      {/* Ngày chiếu */}
      <div className="flex space-x-2 justify-center">
        {listDay.map((item, index) => (
          <div
            onClick={() => handleChangeData(item.date, true)}
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
      <div className="flex justify-between">
        <div className="heading text-white text-center">Thời gian chiếu</div>
        <div className="">
          <select
            className="border border-cinestar-gold rounded-md h-full w-64"
            onChange={(e) =>
              setSearchData((prev) => ({ ...prev, theater: e.target.value }))
            }
          >
            {listTheater.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-purple-blue-gradient space-x-4 flex justify-center p-8 rounded-md">
        {listTime?.showTime?.map((item, index) => (
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
      {day && time && <SeatBooking />}
    </div>
  );
};

export default MovieSchedule;
