import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import SeatBooking from "../SeatBooking/SeatBooking";
import TicketContext from "../../context/TicketContext/TicketContext";
import scheduleService from "../../api/scheduleService";
import { listTheater } from "../../constants/searchbox";

const MovieSchedule = ({ idFilm }) => {
  const { searchData, setSearchData } = useContext(TicketContext);

  // Ngày trong tuần
  const days = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];

  // State quản lý lịch chiếu và các lựa chọn
  const [filmSchedule, setFilmSchedule] = useState([]);
  const [day, setDay] = useState(searchData.date || "");
  const [time, setTime] = useState(searchData.time || "");
  const [theater, setTheater] = useState(searchData.theater || "");

  // Định dạng ngày và giờ
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const formatTime = (dateString) =>
    new Date(dateString).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const convertToDow = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return days[new Date(year, month - 1, day).getDay()];
  };

  // Lấy dữ liệu lịch chiếu từ API
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await scheduleService.getScheduleByIdFilm(idFilm);
        setFilmSchedule(data);
        if (!searchData.date && data.length > 0) {
          setDay(formatDate(data[0].showTime));
        }
      } catch (error) {
        console.error("Lỗi khi lấy lịch chiếu:", error);
      }
    };
    fetchSchedule();
  }, [idFilm, searchData.date]);

  // Định dạng ngày và nhóm theo ngày
  const formattedSchedule = useMemo(() => {
    const groupByDate = filmSchedule.reduce((acc, item) => {
      const date = formatDate(item.showTime);
      const time = formatTime(item.showTime);
      if (!acc[date]) acc[date] = [];
      acc[date].push({ ...item, showTime: time });
      return acc;
    }, {});
    return groupByDate;
  }, [filmSchedule]);

  // Danh sách ngày và thời gian theo lịch chiếu
  const formattedDates = useMemo(
    () => Object.keys(formattedSchedule),
    [formattedSchedule]
  );
  
  useEffect(() => {
    if (!searchData.date && formattedDates.length > 0) {
      setDay(formattedDates[0]); // Đặt ngày đầu tiên từ danh sách
      setSearchData((prev) => ({ ...prev, date: formattedDates[0] }));
    }
  }, [formattedDates, searchData.date]);

  const listTime = useMemo(
    () => formattedSchedule[day]?.map((item) => item.showTime) || [],
    [day, formattedSchedule]
  );

  // Thay đổi lựa chọn ngày, giờ, rạp
  const handleSelectTheater = (selectedTheater) => {
    if (theater !== selectedTheater) {
      setTheater(selectedTheater);
      setSearchData((prev) => ({ ...prev, theater: selectedTheater }));
    }
  };

  const handleSelectDay = (selectedDay) => {
    setDay(selectedDay);
    setTime("");
    setSearchData((prev) => ({ ...prev, date: selectedDay, time: "" }));
  };

  const handleSelectTime = (selectedTime) => {
    setTime(selectedTime);
    setSearchData((prev) => ({ ...prev, time: selectedTime }));
  };

  // const handleSelectTheater = (selectedTheater) => {
  //   setTheater(selectedTheater);
  //   setSearchData((prev) => ({ ...prev, theater: selectedTheater }));
  // };

  const selectedSchedule = useMemo(() => {
    return (
      formattedSchedule[day]?.find((item) => item.showTime === time) || null
    );
  }, [day, time, formattedSchedule]);

  // console.log('format schedule: ', formattedSchedule[day]);
  // console.log('selected ',selectedSchedule);
  

  return (
    <div className="space-y-8">
      {/* Chọn rạp */}
      <div className="heading text-white text-center">Rạp Chiếu</div>
      <div className="w-full h-14">
        <select
          className="border border-cinestar-gold rounded-md w-full h-full text-xl font-bold text-center"
          value={theater}
          onChange={(e) => handleSelectTheater(e.target.value)}
        >
          <option value="abc">Chọn rạp</option>
          {listTheater.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Lịch chiếu */}
      <div className="heading text-white text-center">Lịch Chiếu</div>
      <div className="flex gap-2 flex-wrap md:justify-center">
        {formattedDates.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col border border-cinestar-gold/70 text-cinestar-gold font-content w-28 py-7 rounded-md cursor-pointer ${
              day === item
                ? "bg-cinestar-gold text-cinestar-purple/90 font-bold"
                : ""
            }`}
            onClick={() => handleSelectDay(item)}
          >
            <div className="text-center text-xl">{item.slice(0, 5)}</div>
            <div className="text-center">{convertToDow(item)}</div>
          </div>
        ))}
      </div>

      {/* Thời gian chiếu */}
      <div className="heading text-white text-center">Thời Gian Chiếu</div>
      <div className="bg-purple-blue-gradient gap-4 flex justify-center flex-wrap p-8 rounded-md">
        {listTime.map((item, index) => (
          <div
            key={index}
            className={`rounded-md cursor-pointer p-2 w-[60px] text-center transition-all duration-200 ${
              time === item
                ? "text-cinestar-black bg-cinestar-gold border-2 font-bold"
                : "border text-white hover:text-cinestar-gold hover:border-cinestar-gold"
            }`}
            onClick={() => handleSelectTime(item)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Chọn ghế */}
      {day && time && selectedSchedule && <SeatBooking schedule={selectedSchedule}/>}
    </div>
  );
};

export default MovieSchedule;
