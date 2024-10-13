import React from "react";
import { Screen } from "../../assets";

const Room = ({ roomNum }) => {
  console.log(roomNum);

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Screen */}
      <div className="w-full">
        <img src={Screen} alt="" />
      </div>
      {/* Content */}
      <div className="">{roomNum === 1 && <Room1 />}</div>
      {/* <div className="">{roomNum === 2 && <Room2 />}</div>
      <div className="">{roomNum === 3 && <Room3 />}</div>
      <div className="">{roomNum === 4 && <Room4 />}</div>
      <div className="">{roomNum === 5 && <Room5 />}</div> */}
    </div>
  );
};

export default Room;
