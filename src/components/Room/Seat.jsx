import React from "react";

const Seat = ({ seatNumber, isBooked, isSelected, onClick, isCouple }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-md text-cinestar-custom-bule w-fit py-1 font-bold 
        ${isBooked ? "bg-[#47566b] text-[#979ca3]" : ""} 
        ${isSelected ? "bg-cinestar-gold text-cinestar-custom-bule" : "bg-white"}
        ${isCouple ? "col-span-2 px-4" : "px-2"}
      `}
      disabled={isBooked}
    >
      {seatNumber}
    </button>
  );
};

export default Seat;
