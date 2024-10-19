import React, { useState } from "react";
import SearchContext from "./SearchContext";

const SearchContextWrapper = (props) => {
  const [searchData, setSearchData] = useState({
    theater: '',
    film: '',
    date: '',
    time: ''
  })

  const [statusData, setStatusData] = useState({
    theater: false,
    film: false,
    date: false,
    time: false,
  });

  // Control status
  const openList = (type, status) => {
    setStatusData((prevState) => ({
      ...prevState,
      [type]: !status,
    }));
  };

  // Control search: chưa viết

  return (
    <SearchContext.Provider value={{
        searchData,
        setSearchData,
        statusData,
        setStatusData,
        openList
    }}>
        {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextWrapper;
