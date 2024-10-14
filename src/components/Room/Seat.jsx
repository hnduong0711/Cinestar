import React from "react";

const Seat = ({ seatNumber, isBooked, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`seat ${isBooked ? "booked" : ""} ${
        isSelected ? "selected" : ""
      }`}
      disabled={isBooked}
    >
      {seatNumber}
    </button>
  );
};

export default Seat;
