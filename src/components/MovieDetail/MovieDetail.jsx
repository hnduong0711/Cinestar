import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ClockIcon, SubtitleIcon, TagIcon } from "../../assets";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import MovieSchedule from "../MovieSchedule/MovieSchedule";
import TicketContext from "../../context/TicketContext/TicketContext";
import movieService from "../../api/movieService";

const MovieDetail = () => {
  const location = useLocation();
  // const film = location.state;
  const [film, setFilm] = useState(location.state || null);
  const { id } = useParams();
  
  const { searchData, setSearchData } = useContext(TicketContext);
  
  // useEffect(() => {
  //   const fetchData = async() => {
  //     const data = await movieService.getFilmById(id);
  //     setFilm(data);
  //   }
  //   if (!film) {
  //     fetchData();
  //   }
  // }, [film, id]);
  
  useEffect(() => {
    setSearchData((prev) => ({
      ...prev,
      film: film.name,
    }));
  }, [film]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full pt-36 px-[4.5rem] py-10">
      <div className="flex md:flex-row flex-col">
        {/* Poster */}
        <div className="md:basis-1/3 min-w-[260px]">
          <img src={`/${film.poster}`} className="rounded-md md:w-full w-[70%] flex m-auto" alt="film" />
        </div>
        <div className="md:pl-6 md:pt-0 pt-6 basis-2/3 flex flex-col">
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
                  {film.subTitle}
                </div>
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="pt-5 text-gray-100 hidden md:block">
            <div className="heading text-[22px]">Nội dung phim</div>
            <div className="pt-3 text-[18px]">{film.description}</div>
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
        <MovieSchedule idFilm={film.id}/>
      </div>
    </div>
  );
};

export default MovieDetail;
