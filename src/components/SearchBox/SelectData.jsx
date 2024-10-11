import React, { useContext, useEffect } from "react";
import SearchContext from "../../context/SearchContext/SearchContext";

const SelectData = ({ list, id }) => {
  const { searchData, setSearchData, setStatusData } =
    useContext(SearchContext);

  const handleSelect = (item, group) => {
    // Điều kiện cho theater
    if (
      (searchData.theater === "" || searchData.theater !== item) &&
      group === "theater"
    ) {
      setSearchData((prevData) => ({
        ...prevData,
        theater: item,
      }));
      setStatusData((prevState) => ({
        ...prevState,
        theater: false,
        film: true,
      }));
    }
    // Điều kiện cho film
    else if (
      searchData.theater !== "" &&
      (searchData.film === "" || searchData.film !== item) &&
      group === "film"
    ) {
      setSearchData((prevData) => ({
        ...prevData,
        film: item,
      }));
      setStatusData((prevState) => ({
        ...prevState,
        film: false,
        date: true,
      }));
    }
    // Điều kiện cho date
    else if (
      searchData.film !== "" &&
      (searchData.date === "" || searchData.date !== item) &&
      group === "date"
    ) {
      setSearchData((prevData) => ({
        ...prevData,
        date: item,
      }));
      setStatusData((prevState) => ({
        ...prevState,
        date: false,
        time: true,
      }));
    }
    // Điều kiện cho time
    else if (
      searchData.date !== "" &&
      (searchData.time === "" || searchData.time !== item) &&
      group === "time"
    ) {
      setSearchData((prevData) => ({
        ...prevData,
        time: item,
      }));
      setStatusData((prevState) => ({
        ...prevState,
        time: false,
      }));
    }
  };

  return (
    <div className="bg-gray-100 rounded-sm absolute left-0 md:top-19 lg:top-14 backdrop-blur-xl shadow-2xl w-full z-[11] max-h-[220px] overflow-y-auto">
      {list.map((item, index) => (
        <div
          key={index}
          className="hover:bg-gray-300 flex items-center pl-1 cursor-pointer py-1 border-b border-gray-300 h-[55px]"
          onClick={() => handleSelect(item, id)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default SelectData;
