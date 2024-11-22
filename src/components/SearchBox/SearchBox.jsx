import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Button from "../Button/Button";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { listTheater } from "../../constants/searchbox";
import SelectData from "./SelectData";
import TicketContext from "../../context/TicketContext/TicketContext";
// import { filmList } from "../../constants/movie";
import { schedule } from "../../constants/scheduleTest";
import { useNavigate } from "react-router-dom";
import movieService from "../../api/movieService";
import { formattedSchedule, convertToDow } from "../../utils/dateFormat";
import scheduleService from "../../api/scheduleService";

const SearchBox = () => {
  const navigate = useNavigate();
  const { searchData, statusData, openList } = useContext(TicketContext);
  const [listMovie, setListMovie] = useState();
  const [listDay, setListDay] = useState([]);
  const [listTime, setListTime] = useState([]);
  const [savedSchedule, setSavedSchedule] = useState([]);

  useEffect(() => {
    const fetchFilmData = async () => {
      const filmData = await movieService.getAllMoives();
      const filteredFilm = filmData.records.reduce((acc, item) => {
        acc.push(item.name);
        return acc;
      }, []);
      setListMovie(filteredFilm);
    };
    fetchFilmData();
  }, []);

  const getFilmByName = async (name) => {
    const film = await movieService.getFilmByName(name); // Đảm bảo có `await`
    console.log("Film: ", film); // Kiểm tra dữ liệu trả về
    return film;
  };

  // Lấy danh sách ngày
  useEffect(() => {
    const fetchData = async () => {
      try {
        const film = await getFilmByName(searchData.film);
        if (film.length > 0) {
          const idFilm = film[0].id;
          const schedule = await scheduleService.getScheduleByIdFilm(idFilm);
          const groupScheduleByDate = formattedSchedule(schedule);
          setSavedSchedule(groupScheduleByDate);
          const formattedDates = Object.keys(groupScheduleByDate);
          const newListDay = formattedDates.map((item) => {
            return `${item}: ${convertToDow(item)}`
          })
          setListDay(newListDay);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (searchData.film) {
      fetchData();
    }
  }, [searchData.film]);
  

  // Lấy danh sách thời gian
  useEffect(() => {
    if(searchData.date){
      const x = savedSchedule[searchData.date];
      if(x){
        const y = x.reduce((acc, item) => {
          acc.push(item.showTime);
          return acc
        }, [])
        setListTime(y)
      }else {
        setListTime([])
      }
    }
  }, [searchData.date, savedSchedule])

  // console.log("listtime: ", listTime);
  // console.log("search Data: ", searchData);

  // Xử lý đặt vé nhanh
  const quickSearchFilm = (name) => {
    const fetchData = async () => {
      const film = await movieService.getFilmByName(name);
      console.log('film: ',film);
      
      navigate(`/movie/${film[0].id}`, { state: film[0] });
    }
    fetchData();
  };

  return (
    <div className="xl:p-4 lg:p-3 md:p-2 xs:p-1">
      <div className="relative lg:w-[95%] md:w-[85%] xl:p-4 lg:p-3 md:p-2 xs:p-1 rounded-md grid lg:grid-cols-6 items-center gap-4 m-auto bg-blue-100">
        <div className="xl:text-[26px] lg:text-[22px] text-[28px] text-gray-700 heading lg:text-left text-center">
          Đặt vé nhanh
        </div>
        <div className="relative">
          <div
            className="select-data-btn cursor-pointer"
            onClick={() => openList("theater", statusData.theater)}
          >
            <span className="truncate">
              {searchData.theater ? searchData.theater : "1. Chọn rạp"}
            </span>
            <ChevronDownIcon className="w-4 ml-2" />
          </div>
          {/* List theater*/}
          {statusData.theater && <SelectData list={listTheater} id="theater" />}
        </div>
        <div className="relative">
          <div
            className={`select-data-btn ${
              searchData.theater !== "" ? "cursor-pointer" : ""
            }`}
            onClick={() => openList("film", statusData.film)}
          >
            <span className="truncate">
              {searchData.film ? searchData.film : "2. Chọn phim"}
            </span>
            <ChevronDownIcon className="w-4 ml-2" />
          </div>
          {/* List film*/}
          {statusData.film && <SelectData list={listMovie} id="film" />}
        </div>
        <div className="relative">
          <div
            className={`select-data-btn ${
              searchData.film !== "" ? "cursor-pointer" : ""
            }`}
            onClick={() => openList("date", statusData.date)}
          >
            <span className="truncate">
              {searchData.date ? searchData.date : "3. Chọn ngày"}
            </span>
            <ChevronDownIcon className="w-4 ml-2" />
          </div>
          {/* List */}
          {statusData.date && <SelectData list={listDay} id="date" />}
        </div>
        <div className="relative">
          <div
            className={`select-data-btn ${
              searchData.date !== "" ? "cursor-pointer" : ""
            }`}
            onClick={() => openList("time", statusData.time)}
          >
            <span className="truncate">
              {searchData.time ? searchData.time : "4. Chọn suất"}
            </span>
            <ChevronDownIcon className="w-4 ml-2" />
          </div>
        {/* List time*/}
        {statusData.time && <SelectData list={listTime} id="time" />}
        </div>

        {/* Button booking */}
        <Button
          text="Đặt ngay"
          onClick={() => quickSearchFilm(searchData.film)}
          className="button bg-cinestar-gold w-full h-[50px] mr-3 group hover:text-white text-[16px]"
          colorChange="bg-purple-blue-gradient"
        />
      </div>
    </div>
  );
};

export default SearchBox;
