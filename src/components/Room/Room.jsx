import React, { useContext, useEffect, useState, useRef } from "react";
import { Screen } from "../../assets";
import Seat from "./Seat";
import TicketContext from "../../context/TicketContext/TicketContext";
import { seatService } from "../../api/reservationService";
import scheduleService from "../../api/scheduleService";
import ticketService from "../../api/ticketService";

const Room = ({ seatQuantity, schedule, typeTicketRef, foodCombo }) => {
  const [seats, setSeats] = useState([]);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);
  const { ticketData, setTicketData } = useContext(TicketContext);
  const [selectedSeats, setSelectedSeats] = useState({
    selectedList: [],
    singleSeats: 0,
    coupleSeats: 0,
  });
  const [savedTicketId, setSavedTicketId] = useState(null);

  // console.log('ticket ',ticketData);
  // console.log('select ',selectedSeats.selectedList);

  // lấy dữ liệu ghế
  useEffect(() => {
    const fetchData = async () => {
      const data = await scheduleService.getScheduleByIdSchedule(schedule.id);
      setSeats(data["seatInfo"]["allSeats"]);
      setBookedSeats(data["seatInfo"]["bookedSeat"]);
    };
    fetchData();
  }, [schedule.roomNumber]);

  // xóa 1 vé trong số lượng vé đặt

  // lấy số hàng
  const uniqueRow = [...new Set(seats.map((item) => item.row))];
  useEffect(() => {
    setRows(uniqueRow.length);
  }, [uniqueRow]);

  // lấy số cột
  const maxColsPerRow = seats.reduce((acc, seat) => {
    const row = seat.row;
    const column = parseInt(seat.column);
    const seatType = seat.seatType;
    if (!acc[row]) acc[row] = 0;
    acc[row] = Math.max(acc[row], column + (seatType === "couple" ? 1 : 0));
    return acc;
  }, {});

  // tìm số cột tối đa trong tất cả các hàng
  const maxCols = Math.max(...Object.values(maxColsPerRow));
  useEffect(() => {
    setCols(maxCols);
  }, [maxColsPerRow]);

  // kiểm tra ghế đã đặt
  const bookedSeatKeys = new Set(
    bookedSeats.map((seat) => `${seat.row}-${seat.column}`)
  );

  const isInitialMount = useRef(true);
  console.log("id of ticket:", savedTicketId);
  

  // kiểm tra coi state đã cập nhật chưa
  useEffect(() => {
    if (isInitialMount.current) {
      // Bỏ qua lần chạy đầu tiên
      isInitialMount.current = false;
      return;
    }

    if (ticketData.seats.length > 0 || foodCombo.length > 0) {
      if(savedTicketId === null ){
        createTicket();
      }else{
        updateTicket();
      }
    } else if (ticketData.seats.length === 0 && foodCombo.length === 0) {
      deleteTicket();
    }
  }, [ticketData.seats, foodCombo]);

  // chọn ghế
  const handleChoice = (seat) => {
    const singleBought =
      seatQuantity.find((seat) => seat.type === "single")?.soLuong || 0;
    const coupleBought =
      seatQuantity.find((seat) => seat.type === "couple")?.soLuong || 0;

    if (singleBought === 0 && coupleBought === 0) {
      alert("Vui lòng mua vé trước khi đặt");
      if (typeTicketRef.current) {
        typeTicketRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    setSelectedSeats((prevSelectedSeats) => {
      // Kiểm tra ghế đã chọn
      const isSelected = prevSelectedSeats["selectedList"].some(
        (prevSeat) => prevSeat.id === seat.id
      );

      // Cập nhật danh sách ghế đã chọn
      const updatedSelectedList = isSelected
        ? prevSelectedSeats["selectedList"].filter(
            (prevSeat) => prevSeat.id !== seat.id
          )
        : [...prevSelectedSeats["selectedList"], seat];

      // Đếm ghế đơn và ghế đôi đã chọn
      const singleSeats = updatedSelectedList.filter(
        (s) => s.seatType === "single"
      ).length;

      const coupleSeats = updatedSelectedList.filter(
        (s) => s.seatType === "couple"
      ).length;

      // Kiểm tra số lượng ghế
      if (singleSeats > singleBought || coupleSeats > coupleBought) {
        alert("Số lượng ghế đã chọn vượt quá số lượng vé");
        if (typeTicketRef.current) {
          typeTicketRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
        setTicketData((prevData) => ({
          ...prevData,
          seats: prevSelectedSeats.selectedList, // Cập nhật `seats` trong `ticketData`
        }));
        return prevSelectedSeats; // Không cập nhật nếu vượt số lượng
      }
      setTicketData((prevData) => ({
        ...prevData,
        seats: updatedSelectedList, // Cập nhật `seats` trong `ticketData`
      }));
      return {
        ...prevSelectedSeats,
        selectedList: updatedSelectedList,
        singleSeats,
        coupleSeats,
      };
    });
  };

  // tạo vé khi bấm vào ghế để giữ ghế
  const createTicket = async () => {
    const storedData = sessionStorage.getItem("authToken");
    const { token } = JSON.parse(storedData);
    const listSeatId = ticketData.seats.map((seat) => seat.id);
    const listFoodId = foodCombo.map((food) => food.id);
    const data = {
      movieScheduleId: schedule.id,
      seatId: listSeatId,
      foodId: listFoodId,
      totalTicket: 1,
      totalPrice: 1,
      userId: "aaa",
    };
    const response = await ticketService.addTicket(data, token);
    setSavedTicketId(response.id);
  };

  // xóa vé khi không còn chọn ghế nào
  const deleteTicket = async () => {
    const storedData = sessionStorage.getItem("authToken");
    const { token } = JSON.parse(storedData);
    const response = await ticketService.deleteTicketById(savedTicketId, token);
    console.log("delete:", response); 
    setSavedTicketId(null);
  };

  const updateTicket = async () => {
    const storedData = sessionStorage.getItem("authToken");
    const { token } = JSON.parse(storedData);
    const listSeatId = ticketData.seats.map((seat) => seat.id);
    const listFoodId = foodCombo.map((food) => food.id);
    const data = {
      movieScheduleId: schedule.id,
      seatId: listSeatId,
      foodId: listFoodId,
      totalTicket: 1,
      totalPrice: 1,
      userId: "aaa",
    };
    const response = await ticketService.updateTicket(savedTicketId, data, token);
    console.log(response);
    
  }

  // console.log("selected ", selectedSeats.selectedList);
  // console.log("seatQuan ", seatQuantity);

  return (
    <div className="flex flex-col gap-5 justify-center">
      {/* Screen */}
      <div className="flex m-auto relative">
        <img src={Screen} alt="" />
        <span className="text-3xl font-bold text-white absolute top-0 left-[50%] translate-x-[-50%] translate-y-[50%]">
          Màn hình
        </span>
      </div>
      {/* Content */}
      <div className="sm:w-full md:w-[90%] lg:w-[85%] flex m-auto">
        <div
          className={`grid gap-y-4 gap-x-2 justify-items-center items-center w-full`}
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          }}
        >
          {seats.map((seat) => (
            <Seat
              key={seat.row + seat.column}
              seatNumber={
                seat.row + (seat.column < 10 ? "0" + seat.column : seat.column)
              }
              isBooked={bookedSeatKeys.has(`${seat.row}-${seat.column}`)}
              isSelected={selectedSeats["selectedList"].includes(seat)}
              isCouple={seat.seatType === "couple"}
              isNone={seat.seatType === "none"}
              onClick={() => handleChoice(seat)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Room;
