import React from "react";

const Seat = ({ seatNumber, isBooked, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-md bg-white text-cinestar-black w-[50%] ${isBooked ? "bg-[#47566b] text-[#979ca3]" : ""} ${
        isSelected ? "bg-cinestar-gold text-white" : ""
      }`}
      disabled={isBooked}
    >
      {seatNumber}
    </button>
  );
};

export default Seat;
