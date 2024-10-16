import React from "react";

const SearchContext = React.createContext({
  // Data
  searchData: {
    theater: "",
    film: "",
    date: "",
    time: "",
  },
  setSearchData: () => {},
  // Status
  statusData: {
    theater: false,
    film: false,
    date: false,
    time: false,
  },
  setStatusData: () => {},
  // Detail booking
  ticketData: {
    room: null,
    seatNum: null,
    seats: [],
    foods: []
  },
  setTicketData: () => {},
});

export default SearchContext;
