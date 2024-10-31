import React from "react";

const Seat = ({ seatNumber, isBooked, isSelected, onClick, isCouple }) => {

  const getClass = (isBooked, isSelected, isCouple) => {
    if(isBooked && isCouple && (isSelected || !isSelected)){
      return "bg-booked-couple-seat text-[#979ca3]"
    }else if (isBooked && !isCouple && (isSelected || !isSelected)){
      return "bg-booked-single-seat text-[#979ca3]"
    }else if (!isBooked && isCouple && !isSelected){
      return "bg-couple-seat text-cinestar-custom-bule"
    }else if (!isBooked && isCouple && isSelected){
      return "bg-selected-couple-seat text-cinestar-custom-bule"
    }else if (!isBooked && !isCouple && isSelected){
      return "bg-selected-single-seat text-cinestar-custom-bule"
    }else if (!isBooked && !isCouple && !isSelected){
      return "bg-single-seat text-cinestar-custom-bule"
    }
  }
  
  return (
    <button
      onClick={onClick}
      className={`rounded-md w-full py-1 font-bold bg-no-repeat bg-center
        ${isCouple ? 'col-span-2' : 'col-span-1'}
        ${getClass(isBooked, isSelected, isCouple)}
      `}
      disabled={isBooked}
    >
      {seatNumber}
    </button>
  );
};

export default React.memo(Seat);
