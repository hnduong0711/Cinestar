import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Button from "../Button/Button";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { listTheater } from "../../constants/searchbox";
import SelectData from "./SelectData";
import TicketContext from "../../context/TicketContext/TicketContext";
import { filmList } from "../../constants/movie";
import { schedule } from "../../constants/scheduleTest";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { searchData, statusData, openList } = useContext(TicketContext);
  const listFilm = filmList.map((item) => item.name);
  // Lấy object phim
  const findMovie = (name) => {
    return filmList.find((item) => item.name === name);
  };
  // Lấy date
  const listDay = useMemo(() => {
    return schedule.reduce((acc, item) => {
      if (searchData.film) {
        const film = findMovie(searchData.film);
        if (film && item.id === film.id) {
          const newItem = `${item.date}: ${item.dow}`;
          acc.push(newItem);
        }
      }
      return acc;
    }, []);
  }, [searchData.film]);
  // Lấy thời gian
  const listTime = useMemo(() => {
    if (searchData.film) {
      const film = findMovie(searchData.film);
      const scheduleItem = schedule.find((item) => {
        if (searchData.date) {
          return (
            item.date === searchData.date.split(":")[0] && item.id === film.id
          );
        }
      });
      if (scheduleItem) {
        return scheduleItem.showTime.map((timeObj) => timeObj.time);
      }
    }
    return [];
  }, [searchData.date, searchData.film]);

  console.log("search Data: ", searchData);

  // Xử lý đặt vé nhanh
  const quickSearchFilm = (name) => {
    const film = findMovie(name);
    navigate(`/movie/${film.id}`, { state: film });
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
          {/* List */}
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
          {/* List */}
          {statusData.film && <SelectData list={listFilm} id="film" />}
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
          {/* List */}
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
