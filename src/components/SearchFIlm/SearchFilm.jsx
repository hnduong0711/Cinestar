import React, { useContext, useEffect, useRef, useState } from "react";
import Movie from "../Movie/Movie";
import "./now.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import movieService from "../../api/movieService";
import GlobalContext from "../../context/GlobalContext/GlobalContext";

const SearchFilm = () => {
  const sliderRef = useRef(null);
  const { name } = useContext(GlobalContext);

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getFilmByName(name);
        console.log(data);

        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [name]);

  return (
    movies && (
      <div className="w-full py-20 lg:px-20 md:px-5 xs:px-2">
        <div className="flex flex-col items-center">
          <div className="heading text-gray-100 pb-4">Phim đang tìm</div>
          <div className="relative w-full">
            <div className="grid grid-cols-4">
              {movies.map((film) => (
                <Movie key={film.id} film={film} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SearchFilm;
