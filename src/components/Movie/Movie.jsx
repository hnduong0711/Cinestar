import React, { useContext } from "react";
import {
  ClockIcon,
  PlayTrailerIcon,
  SubtitleIcon,
  TagIcon,
} from "../../assets";
import Button from "../Button/Button";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import TicketContext from "../../context/TicketContext/TicketContext";

const Movie = ({ film }) => {

  const { searchData, setSearchData } = useContext(TicketContext)

  const navigate = useNavigate();
  const bookTicket = () => {
    setSearchData((prevData) => ({
      ...prevData,
      film: film.name
    }));
    navigate(`/movie/${film.id}`, { state: film });
  }

  return (
    <div className="flex flex-col w-full p-2">
      <Link to={`/movie/${film.id}`} state={film}>
        {/* Poster */}
        <div className="basis-3/4 cursor-pointer relative">
          <img
            src={film.poster}
            alt="poster"
            className="rounded-md h-[400px] flex m-auto md:block"
          />
          {/* Detail */}
          <div className="flex flex-col justify-evenly absolute left-0 top-0 bg-cinestar-black-opacity transition-all duration-300 hover:translate-y-0 translate-y-3 w-full h-full text-white pl-2 opacity-0 hover:opacity-100 after:absolute after:top-[400px] after:left-0 after:w-full after:h-20">
            <div className="text-[28px] font-semibold text-center">
              {film.name}
            </div>
            <div className="text-[16px] grid gap-3">
              <div className="flex items-center">
                <span className="mr-1">
                  <img src={TagIcon} alt="" />
                </span>
                {film.genres.map((item, index) => (
                  <span key={index}>
                    {item}
                    {index === film.genres.length - 1 ? "." : ",\u00A0"}
                  </span>
                ))}
              </div>
              <div className="flex items-center">
                <span className="mr-1">
                  <img src={ClockIcon} alt="" />
                </span>
                {film.duration}
              </div>
              <div className="flex items-center">
                <span className="mr-1">
                  <GlobeAltIcon className="text-yellow-300 w-5 h-5" />
                </span>
                {film.dub}
              </div>
              <div className="flex items-center">
                <span className="mr-1">
                  <img src={SubtitleIcon} className="w-5 h-5" alt="" />
                </span>
                {film.subtitle}
              </div>
            </div>
          </div>
        </div>
      </Link>
      {/* Info */}
      <div className="basis-1/4 pt-2 w-full">
        <div className="text-center text-xl pb-2 text-white cursor-pointer">
          {film.name}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center cursor-pointer relative">
            <img src={PlayTrailerIcon} alt="play-trailer" />
            <span className="ml-2 text-white relative after:transition-all after:duration-300 after:ease-in-out after:absolute after:left-0 after:top-6 after:w-0 hover:after:w-full after:border-b-2 after:border-cinestar-gold ">
              Xem trailer
            </span>
          </div>
          <Button
            className="button bg-cinestar-gold w-[125px] h-[40px] font-title text-[14px] group hover:text-white hover:duration-300"
            text="Đặt vé"
            colorChange="bg-orange-yellow-gradient"
            onClick={bookTicket}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
