import React, { useRef } from "react";
import { comingList } from "../../constants/movie";
import Movie from "../Movie/Movie";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Slider from "react-slick";
import "./comingSoon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ComingSoon = () => {
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Số slide hiển thị trên màn hình lớn
    slidesToScroll: 4, // Số slide trượt qua mỗi lần
    responsive: [
      {
        breakpoint: 1280, // Breakpoint cho màn hình lớn
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024, // Breakpoint cho màn hình tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640, // Breakpoint cho màn hình mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="w-full py-20 lg:px-20 md:px-5 xs:px-2">
      <div className="flex flex-col items-center">
        <div className="heading text-gray-100 pb-4">
          Phim sắp chiếu
        </div>
        <div className="relative w-full">
          {/* Nút Chevron trái */}
          <ChevronLeftIcon
            className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer w-12 text-white z-10"
            onClick={() => sliderRef.current.slickPrev()}
          />

          {/* Slider */}
          <div className="w-[90%] flex m-auto">
            <Slider {...settings} ref={sliderRef} className="w-full">
              {comingList.map((film, index) => (
                <Movie film={film} key={index} />
              ))}
            </Slider>
          </div>

          {/* Nút Chevron phải */}
          <ChevronRightIcon
            className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer w-12 text-white z-10"
            onClick={() => sliderRef.current.slickNext()}
          />
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
