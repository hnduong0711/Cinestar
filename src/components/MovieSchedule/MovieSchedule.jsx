import React, { useContext, useEffect, useMemo, useState } from "react";
import { schedule } from "../../constants/scheduleTest";
import { useParams } from "react-router-dom";
import SeatBooking from "../SeatBooking/SeatBooking";
import TicketContext from "../../context/TicketContext/TicketContext";
import { listTheater } from "../../constants/searchbox";
import scheduleService from "../../api/scheduleService";

const MovieSchedule = ({ idFilm }) => {
  const { id } = useParams();
  const { searchData, setSearchData } = useContext(TicketContext);

  // Định nghĩa thứ trong tuần
  const days = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const [filmSchedule, setFilmSchedule] = useState([]);
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await scheduleService.getScheduleByIdFilm(idFilm); // Chờ kết quả từ API
      setFilmSchedule(data); // Cập nhật state với dữ liệu thực tế
    };
    fetchData();
  }, [idFilm]);

  // Lọc ra ngày dưới dạng DD/MM
  const groupByDateFormatted = (list) => {
    return list.reduce((acc, item) => {
      // Định dạng ngày dd-MM-yyyy
      const date = new Date(item.showTime);
      const formattedDate = date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      // Định dạng giờ:phút
      const hours = date.getHours().toString().padStart(2, "0"); // Lấy giờ, thêm số 0 nếu cần
      const minutes = date.getMinutes().toString().padStart(2, "0"); // Lấy phút, thêm số 0 nếu cần
      const formattedTime = `${hours}:${minutes}`;

      // Thêm vào object kết quả
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push({ ...item, showTime: formattedTime });
      return acc;
    }, {});
  };

  // Data sau khi định dạng
  const formattedSchedule = groupByDateFormatted(filmSchedule);
  const formattedDate = Object.keys(groupByDateFormatted(filmSchedule));
  console.log("date", formattedDate);

  //   // Lọc ra thời gian từ ngày
  const [day, setDay] = useState(
    searchData.date ? searchData.date : formattedDate[0]
  );
  useEffect(() => {
    if (formattedDate.length > 0 && !searchData.date) {
      setDay(formattedDate[0]); // Cập nhật `day` khi `formattedDate` thay đổi
    }
  }, [formattedDate, searchData.date]);
  console.log("day", day);

  const listTime = useMemo(() => {
    if (day) {
      return formattedSchedule[day].reduce((acc, item) => {
        acc.push(item.showTime);
        return acc;
      }, []);
    }
    return [];
  }, [searchData.date, day, formattedDate]);

  const [time, setTime] = useState(null);

  useEffect(() => {
    setSearchData((prevData) => ({
      ...prevData,
      theater: theater,
    }));
  }, [searchData.theater]);

  const [theater, setTheater] = useState(searchData.theater || listTheater[0]);

  const handleChangeData = (item, flag) => {
    if (flag) {
      setDay(item);
      setSearchData((prevData) => ({
        ...prevData,
        date: item,
        time: null,
      }));
    } else {
      setTime(item);
      setSearchData((prevData) => ({
        ...prevData,
        time: item,
      }));
    }
  };

  const convertToDow = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    return days[date.getDay()];
  };

  useEffect(() => {
    if (time) {
      const selectedSchedule = formattedSchedule[day].find(
        (item) => item.showTime === time
      );
      setSchedule(selectedSchedule);
    }
  }, [day, searchData.time]);

  // console.log("day: ", day);
  // console.log("search date:", searchData.date);
  // console.log("list day: ", listDay);
  // console.log("list time: ", listTime);
  console.log("search date in MS: ", searchData);
  // console.log(theater);

  return (
    <div className="space-y-8">
      <div className="heading text-white text-center">rạp chiếu</div>
      <div className="w-full h-14">
        <select
          className="border border-cinestar-gold rounded-md w-full h-full text-xl font-bold text-center"
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
      <div className="heading text-white text-center">lịch chiếu</div>
      {/* Ngày chiếu */}
      <div className="flex gap-2 flex-wrap md:justify-center">
        {formattedDate.map((item, index) => (
          <div
            onClick={() => handleChangeData(item, true)}
            key={index}
            className={`flex flex-col border border-cinestar-gold/70 text-cinestar-gold font-content w-28 py-7 rounded-md cursor-pointer ${
              day === item
                ? "bg-cinestar-gold text-cinestar-purple/90 font-bold"
                : ""
            }`}
          >
            <div className="text-center text-xl">{item.slice(0, 5)}</div>
            <div className="text-center">{convertToDow(item)}</div>
          </div>
        ))}
      </div>
      {/* Thời gian chiếu */}
      <div className="flex justify-between">
        <div className="heading text-white text-center">Thời gian chiếu</div>
      </div>
      <div className="bg-purple-blue-gradient gap-4 flex justify-center flex-wrap p-8 rounded-md">
        {listTime.map((item, index) => (
          <div
            key={index}
            onClick={() => handleChangeData(item, false)}
            className={`rounded-md cursor-pointer p-2 w-[60px] text-center transition-all duration-200 ${
              time === item
                ? "text-cinestar-black bg-cinestar-gold border-2 font-bold"
                : "border text-white hover:text-cinestar-gold hover:border-cinestar-gold"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
      {/* Chọn ghế */}
      {day && time && <SeatBooking schedule={schedule} />}
    </div>
  );
};

export default MovieSchedule;
