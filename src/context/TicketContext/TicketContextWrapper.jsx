import React, { useState } from "react";
import TicketContext from "./TicketContext";

const TicketContextWrapper = (props) => {
  const [searchData, setSearchData] = useState({
    theater: null,
    film: null,
    date: null,
    time: null
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

  // Detail booking
  const [ticketData, setTicketData] = useState({
    room: null,
    seats: [],
    foods: []
  });

  const [ticket, setTicket] = useState(null)

  return (
    <TicketContext.Provider value={{
        searchData,
        setSearchData,
        statusData,
        setStatusData,
        openList,
        ticketData,
        setTicketData,
        ticket,
        setTicket
    }}>
        {props.children}
    </TicketContext.Provider>
  );
};

export default TicketContextWrapper;
