import React from "react";

const Seat = ({ seatNumber, isBooked, isSelected, onClick, isCouple, isVirtual }) => {

  const getClass = (isBooked, isSelected, isCouple, isVirtual) => {
    if(isBooked && isCouple && (isSelected || !isSelected) && !isVirtual){
      return "bg-booked-couple-seat text-[#979ca3]"
    }else if (isBooked && !isCouple && (isSelected || !isSelected) && !isVirtual){
      return "bg-booked-single-seat text-[#979ca3]"
    }else if (!isBooked && isCouple && !isSelected && !isVirtual){
      return "bg-couple-seat text-cinestar-custom-bule"
    }else if (!isBooked && isCouple && isSelected && !isVirtual){
      return "bg-selected-couple-seat text-cinestar-custom-bule"
    }else if (!isBooked && !isCouple && isSelected && !isVirtual){
      return "bg-selected-single-seat text-cinestar-custom-bule"
    }else if (!isBooked && !isCouple && !isSelected && !isVirtual){
      return "bg-single-seat text-cinestar-custom-bule"
    }else{
      return "bg-none text-transparent"
    }
  }
  
  
  return (
    <button
      onClick={onClick}
      className={`rounded-md w-full py-1 font-bold bg-no-repeat bg-center
        ${isCouple ? 'col-span-2' : 'col-span-1'}
        ${getClass(isBooked, isSelected, isCouple, isVirtual)}
      `}
      disabled={isBooked || isVirtual}
    >
      {seatNumber}
    </button>
  );
};

export default React.memo(Seat);
