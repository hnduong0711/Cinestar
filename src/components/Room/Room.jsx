import React, { useContext, useEffect, useState, useMemo } from "react";
import { Screen } from "../../assets";
import Seat from "./Seat";
import TicketContext from "../../context/TicketContext/TicketContext";
import scheduleService from "../../api/scheduleService";
import ticketService from "../../api/ticketService";
import { useNavigate } from "react-router-dom";

const Room = ({ seatQuantity, schedule, typeTicketRef, foodCombo }) => {
  const [seats, setSeats] = useState([]);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [bookedSeats, setBookedSeats] = useState([]);
  const { ticketData, setTicketData, setTicket } = useContext(TicketContext);
  const [selectedSeats, setSelectedSeats] = useState({
    selectedList: [],
    singleSeats: 0,
    coupleSeats: 0,
  });
  const [savedTicketId, setSavedTicketId] = useState(null);
  const navigate = useNavigate();

  // console.log("ticket ", ticketData);
  // console.log('schedule ',schedule);

  useEffect(() => {
    const pendingTicket = sessionStorage.getItem("pendingTicket");
    console.log("Có chạy");
    if (pendingTicket) {
      console.log("Có pending");
      const { id } = JSON.parse(pendingTicket);
      const { token } = JSON.parse(sessionStorage.getItem("authToken"));
      if (id) {
        console.log("Có id");
        ticketService.deleteTicketById(id, token);
        sessionStorage.removeItem("pendingTicket");
      }
    }
  }, []);

  // lấy dữ liệu ghế
  const fetchData = async () => {
    const data = await scheduleService.getScheduleByIdSchedule(schedule.id);
    setSeats(data["seatInfo"]["allSeats"]);
    setBookedSeats(data["seatInfo"]["bookedSeat"]);
  };
  
  useEffect(() => {
    fetchData();
  }, [schedule.roomNumber, schedule.id]);

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

  console.log(rows, cols);

  // code mới
  const processSeats = () => {
    const seatsByRow = seats.reduce((acc, seat) => {
      if (!acc[seat.row]) acc[seat.row] = [];
      acc[seat.row].push(seat);
      return acc;
    }, {});

    const processedSeats = [];
    Object.keys(seatsByRow).forEach((row) => {
      const seatsInRow = seatsByRow[row];
      const maxColumn = Math.max(
        ...seatsInRow.map((seat) => parseInt(seat.column))
      );

      for (let col = 1; col <= maxColumn; col++) {
        // Kiểm tra xem có ghế thật ở vị trí này hay không
        const existingSeat = seatsInRow.find(
          (seat) => parseInt(seat.column) === col
        );

        if (existingSeat) {
          // Nếu ghế thật là ghế đôi (couple), bỏ qua ghế tiếp theo
          if (existingSeat.seatType === "couple") {
            processedSeats.push(existingSeat);
            col++; // Bỏ qua ghế tiếp theo vì ghế couple chiếm 2 vị trí
          } else {
            processedSeats.push(existingSeat);
          }
        } else {
          // Tạo ghế ảo nếu không có ghế thật
          processedSeats.push({
            row,
            column: col.toString(),
            seatType: "single", // Ghế ảo là single
            id: `${row}-${col}`, // ID tạm
            isVirtual: true, // Đánh dấu là ghế ảo
          });
        }
      }
    });

    return processedSeats;
  };

  console.log(processSeats());

  const bookedSeatKeys = useMemo(() => {
    return new Set(bookedSeats.map((seat) => `${seat.row}-${seat.column}`));
  }, [bookedSeats, schedule.roomNumber]);

  // kiểm tra coi state đã cập nhật chưa
  useEffect(() => {
    if (ticketData.seats.length > 0) {
      if (savedTicketId === null) {
        createTicket();
      } else {
        updateTicket();
      }
    } else if (
      savedTicketId !== null &&
      (ticketData.seats.length === 0 || foodCombo.length === 0)
    ) {
      deleteTicket(); // Chỉ gọi delete khi có savedTicketId
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
      // kiểm tra ghế đã chọn
      const isSelected = prevSelectedSeats["selectedList"].some(
        (prevSeat) => prevSeat.id === seat.id
      );

      // cập nhật danh sách ghế đã chọn
      const updatedSelectedList = isSelected
        ? prevSelectedSeats["selectedList"].filter(
            (prevSeat) => prevSeat.id !== seat.id
          )
        : [...prevSelectedSeats["selectedList"], seat];

      // đếm ghế đơn và ghế đôi đã chọn
      const singleSeats = updatedSelectedList.filter(
        (s) => s.seatType === "single"
      ).length;

      const coupleSeats = updatedSelectedList.filter(
        (s) => s.seatType === "couple"
      ).length;

      // kiểm tra số lượng ghế
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
          seats: prevSelectedSeats.selectedList, // cập nhật seats trong ticketData
        }));
        return prevSelectedSeats; // không cập nhật nếu vượt số lượng
      }
      setTicketData((prevData) => ({
        ...prevData,
        seats: updatedSelectedList, // cập nhật seats trong ticketData
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
    if(!storedData){
      alert("Vui lòng đăng nhập trước khi đặt vé !");
      navigate('/login');
      return;
    }
    const { token } = JSON.parse(storedData);
    const listSeatId = ticketData.seats.map((seat) => seat.id);
    const listFoodId = foodCombo.map((food) => food.id);
    const data = {
      movieScheduleId: schedule.id,
      seatId: listSeatId,
      foodId: listFoodId,
      totalTicket: 1,
      totalPrice: 1,
      userId: JSON.parse(sessionStorage.getItem("username")).id,
    };
    const response = await ticketService.addTicket(data, token);
    console.log("Tạo ", response);
    if (!response) {
      alert("Ghế này đã được đặt trước !");
      setSelectedSeats((prev) => ({
        ...prev,
        selectedList: prev.selectedList.slice(0, -1),
        singleSeats: prev.selectedList
          .slice(0, -1)
          .filter((s) => s.seatType === "single").length,
        coupleSeats: prev.selectedList
          .slice(0, -1)
          .filter((s) => s.seatType === "couple").length,
      }));
      fetchData();
      return;
    }
    sessionStorage.setItem(
      "pendingTicket",
      JSON.stringify({ id: response.id })
    );
    setTicket(response);
    setSavedTicketId(response.id);
  };

  // xóa vé khi không còn chọn ghế nào
  const deleteTicket = async () => {
    const storedData = sessionStorage.getItem("authToken");
    const { token } = JSON.parse(storedData);
    const response = await ticketService.deleteTicketById(savedTicketId, token);
    console.log("Xóa thành công");
    setSelectedSeats((prev) => ({
      ...prev,
      selectedList: [],
    }));
    setTicket(null);
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
      userId: JSON.parse(sessionStorage.getItem("username")).id,
    };
    const response = await ticketService.updateTicket(
      savedTicketId,
      data,
      token
    );
    console.log("Cập nhật: ", response);
    if (!response) {
      alert("Ghế này đã được đặt trước !");
      setSelectedSeats((prev) => ({
        ...prev,
        selectedList: prev.selectedList.slice(0, -1),
        singleSeats: prev.selectedList
          .slice(0, -1)
          .filter((s) => s.seatType === "single").length,
        coupleSeats: prev.selectedList
          .slice(0, -1)
          .filter((s) => s.seatType === "couple").length,
      }));
      fetchData();
      return;
    }
    setTicket(response);
  };

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
          {processSeats().map((seat) => (
            <Seat
              key={seat.row + seat.column}
              seatNumber={
                seat.row + (seat.column < 10 ? "0" + seat.column : seat.column)
              }
              isBooked={bookedSeatKeys.has(`${seat.row}-${seat.column}`)}
              isSelected={selectedSeats["selectedList"].includes(seat)}
              isCouple={seat.seatType === "couple"}
              isVirtual={seat.isVirtual}
              onClick={() => handleChoice(seat)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Room;
