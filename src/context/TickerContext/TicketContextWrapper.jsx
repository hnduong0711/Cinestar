import React, { useContext, useState } from "react";
import TicketContext from "./TicketContext";
import SearchContext from "../SearchContext/SearchContext";

const TicketContextWrapper = (props) => {
  const { searchData } = useContext(SearchContext); 

  const [ticketData, setTicketData] = useState({
    room: null,
    seatNum: null,
    seats: [],
    food: [],
  });

  // Nếu đã có searchData, thì điền vào ticketData
  const updateTicketData = (newData) => {
    setTicketData((prevState) => ({
      ...prevState,
      ...searchData, // Gồm dữ liệu từ searchData (rạp, phim, ngày, giờ)
      ...newData, // Cập nhật các dữ liệu mới như số phòng, ghế ngồi, đồ ăn
    }));
  };

  // Control search: chưa viết

  return (
    <TicketContext.Provider
      value={{ ticketData, setTicketData: updateTicketData }}
    >
      {props.children}
    </TicketContext.Provider>
  );
};

export default TicketContextWrapper;
