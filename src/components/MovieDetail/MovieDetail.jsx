import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ClockIcon, SubtitleIcon, TagIcon } from "../../assets";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import MovieSchedule from "../MovieSchedule/MovieSchedule";
import TicketContext from "../../context/TicketContext/TicketContext";

const MovieDetail = () => {
  const location = useLocation();
  const film = location.state;
  
  const { searchData } = useContext(TicketContext); // Hàm để cập nhật context

  console.log('searchDaa in MD:', searchData) ;

  return (
    <div className="w-full pt-36 px-[4.5rem] py-10">
      <div className="flex">
        {/* Poster */}
        <div className="basis-1/3 min-w-[260px]">
          <img src={film.poster} className="rounded-md" alt="film" />
        </div>
        <div className="pl-6 basis-2/3 flex flex-col">
          {/* Info */}
          <div className="">
            <div className="heading text-gray-100 pb-5">{film.name}</div>
            <div className="flex flex-col justify-evenly">
              <div className="text-[16px] grid gap-3">
                <div className="flex items-center text-gray-100 text-[18px]">
                  <span className="mr-1">
                    <img src={TagIcon} width={24} height={24} alt="" />
                  </span>
                  {film.genres.map((item, index) => (
                    <span key={index}>
                      {item}
                      {index === film.genres.length - 1 ? "." : ",\u00A0"}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-gray-100 text-[18px]">
                  <span className="mr-1">
                    <img src={ClockIcon} width={24} height={24} alt="" />
                  </span>
                  {film.duration}
                </div>
                <div className="flex items-center text-gray-100 text-[18px]">
                  <span className="mr-1">
                    <GlobeAltIcon className="text-yellow-300 w-6 h-6" />
                  </span>
                  {film.dub}
                </div>
                <div className="flex items-center text-gray-100 text-[18px]">
                  <span className="mr-1">
                    <img src={SubtitleIcon} width={24} height={24} alt="" />
                  </span>
                  {film.subtitle}
                </div>
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="pt-5 text-gray-100 hidden md:block">
            <div className="heading text-[22px]">Nội dung phim</div>
            <div className="pt-3">{film.description}</div>
          </div>
        </div>
      </div>
      {/* Description mobile view */}
      <div className="mobile md:hidden inline-block">
        <div className="pt-5 text-gray-100">
          <div className="heading text-[22px]">Nội dung phim</div>
          <div className="pt-3">{film.description}</div>
        </div>
      </div>
      <div className="py-10">
        <MovieSchedule />
      </div>
    </div>
  );
};

export default MovieDetail;
