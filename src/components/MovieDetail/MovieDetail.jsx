import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClockIcon, FilmTest1, SubtitleIcon, TagIcon } from "../../assets";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import MovieSchedule from "../MovieSchedule/MovieSchedule";

const MovieDetail = () => {
  const { id } = useParams();

  return (
    <div className="w-full pt-36 px-[4.5rem] py-14">
      <div className="flex">
        {/* Poster */}
        <div className="basis-1/3 min-w-[260px]">
          <img src={FilmTest1} className="rounded-md" alt="film" />
        </div>
        <div className="pl-6 basis-2/3 flex flex-col">
          {/* Info */}
          <div className="">
            <div className="heading text-gray-100 pb-5">Tên của phim nè</div>
            <div className="flex flex-col justify-evenly">
              <div className="text-[16px] grid gap-3">
                <div className="flex items-center text-gray-100 text-[18px]">
                  <span className="mr-1">
                    <img src={TagIcon} width={24} height={24} alt="" />
                  </span>
                  Thể loại
                </div>
                <div className="flex items-center text-gray-100 text-[18px]">
                  <span className="mr-1">
                    <img src={ClockIcon} width={24} height={24} alt="" />
                  </span>
                  Thời lượng
                </div>
                <div className="flex items-center text-gray-100 text-[18px]">
                  <span className="mr-1">
                    <GlobeAltIcon className="text-yellow-300 w-6 h-6" />
                  </span>
                  Lồng tiếng
                </div>
                <div className="flex items-center text-gray-100 text-[18px]">
                  <span className="mr-1">
                    <img src={SubtitleIcon} width={24} height={24} alt="" />
                  </span>
                  Việt sub
                </div>
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="pt-5 text-gray-100 hidden md:block">
            <div className="heading text-[22px]">Nội dung phim</div>
            <div className="pt-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut
              velit nesciunt possimus. Mollitia dignissimos et necessitatibus
              laboriosam dolor pariatur. Laudantium recusandae nemo amet dolorem
              ea incidunt laboriosam sed expedita quisquam!
            </div>
          </div>
        </div>
      </div>
      <div className="mobile md:hidden inline-block">
        <div className="pt-5 text-gray-100">
          <div className="heading text-[22px]">Nội dung phim</div>
          <div className="pt-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut velit
            nesciunt possimus. Mollitia dignissimos et necessitatibus laboriosam
            dolor pariatur. Laudantium recusandae nemo amet dolorem ea incidunt
            laboriosam sed expedita quisquam!
          </div>
        </div>
      </div>
      <div className="py-10 flex justify-center">
        <MovieSchedule />
      </div>
    </div>
  );
};

export default MovieDetail;
