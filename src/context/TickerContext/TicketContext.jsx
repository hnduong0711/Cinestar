import React from "react";

const TicketContext = React.createContext({
  // Data
  ticketData: {
    room: null,
    seatNum: null,
    seats: [],
    foods: []
  },
  setTicketData: () => {},
});

export default TicketContext;
