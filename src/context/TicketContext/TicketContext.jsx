import React from "react";

const TicketContext = React.createContext({
  // Data
  searchData: {
    theater: null,
    film: null,
    date: null,
    time: null,
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
    seats: [],
    foods: [],
  },
  setTicketData: () => {},
  // ticket
  ticket: null,
  setTicket: () => {}
});

export default TicketContext;
