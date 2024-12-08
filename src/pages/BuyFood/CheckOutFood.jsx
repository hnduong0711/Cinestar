import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom"; // Thêm dòng này
import TicketContext from "../../context/TicketContext/TicketContext";
import ticketService from "../../api/ticketService";

const CheckOutFood = ({
  schedule,
  selectedCombos,
  theaterRef,
  selectedSeats,
}) => {
  const navigate = useNavigate();
  const { searchData, ticketData, ticket, setTicket } =
    useContext(TicketContext);

  console.log(searchData);

  const deleteTicket = async () => {
    const storedData = sessionStorage.getItem("authToken");
    const { token } = JSON.parse(storedData);
    const response = await ticketService.deleteTicketById(ticket.id, token);
    console.log("Xóa thành công");
    setTicket({});
  };

  // tạo sticky
  const [isAtFooter, setIsAtFooter] = useState(false);
  const paymentBarRef = useRef(null);

  // tạo countdown
  const [timeLeft, setTimeLeft] = useState(300); // Thời gian chờ
  const timerRef = useRef(null);
  const handleTimeout = () => {
    alert("Hết thời gian đặt vé, vui lòng thử lại!");
    window.location.reload();
    window.scrollTo(0, 0);
    deleteTicket();
    // Reset trạng thái ứng dụng tại đây
  };

  useEffect(() => {
    // Countdown logic
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          handleTimeout(); // Gọi hàm hủy vé khi hết thời gian
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current); // Dọn dẹp setInterval khi component unmount
  }, [handleTimeout]);

  // console.log(ticketData.seats);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector(".footer"); // Class của footer

      if (footer && paymentBarRef.current) {
        // Kiểm tra nếu ref còn tồn tại
        const footerTop = footer.getBoundingClientRect().top;
        const paymentBarHeight = paymentBarRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        // Kiểm tra nếu thanh bar chạm vào footer
        setIsAtFooter(
          footerTop <= windowHeight - paymentBarHeight + 0.53 * paymentBarHeight
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Tính tiền theo id food
  const totalPriceById = selectedCombos.reduce((acc, combo) => {
    const quantity = combo.quantity || 1;
    const totalComboPrice = combo.amount * quantity;

    if (acc[combo.id]) {
      acc[combo.id] += totalComboPrice; // Nếu đã có ID này, cộng thêm vào
    } else {
      acc[combo.id] = totalComboPrice; // Nếu chưa có, khởi tạo giá trị
    }
    return acc;
  }, {});

  // Tính tiền ghế
  const totalPriceBySeats = selectedSeats.reduce((acc, item) => {
    const price =
      item.type === "single"
        ? schedule.singleSeatPrice * item.soLuong
        : schedule.coupleSeatPrice * item.soLuong;
    return acc + price;
  }, 0);

  // Tính tổng tất cả giá tiền (cộng dồn các ID)
  const totalPrice =
    Object.values(totalPriceById).reduce((total, price) => total + price, 0) +
    totalPriceBySeats;

  // hàm thanh toán
  const handlePayment = () => {
    if (searchData.theater === null || searchData.theater === "") {
      if (theaterRef.current) {
        theaterRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    } else {
      sessionStorage.removeItem("pendingTicket");
      navigate("/payment");
    }
  };

  // đổi sang phút giây
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col">
      {ticketData.seats.length > 0 && (
        <div
          ref={paymentBarRef}
          className={`bg-cinestar-black w-full h-[150px] text-[15px] font-content p-4 text-white fixed bottom-0 z-10 left-0 transition-all duration-200 ${
            isAtFooter
              ? "absolute top-auto bottom-auto w-full z-10"
              : "fixed bottom-0 w-full z-10"
          }`}
        >
          <hr className="w-full" />
          <div className="container mx-auto px-4 p-1">
            <div className="flex">
              {/* Hiển thị thông tin content của các combo đã chọn */}
              <div className="flex flex-col justify-around w-[60%]">
                {/* Tên phim */}
                <div>
                  <p className="text-[24px] font-title">{searchData.film}</p>
                </div>
                {/* Tên rạp */}
                <div>
                  <p className="text-[18px] font-bold">{searchData.theater}</p>
                </div>
                {/* Tên phòng, tên ghế */}
                <div className=" ">
                  <span>Phòng chiếu: {schedule.roomNumber}</span> |{" "}
                  {ticketData.seats.map((seat, index) => (
                    <span key={index} className="">
                      {index > 0 && ", "} {seat.row + seat.column}
                    </span>
                  ))}{" "}
                  | <span>{searchData.time}</span>
                </div>
                {/* Tên thức ăn */}
                <div>
                  {selectedCombos.map((combo, index) => (
                    <span key={index} className="">
                      {index > 0 && ", "} {combo.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-[1px] bg-gray-300 mx-4"></div>
              {/* Thông tin thanh toán */}
              <div className="w-[40%] flex space-x-3 items-center">
                <div className="bg-cinestar-gold text-black rounded-md p-2 font-title">
                  <div className="text-[14px]">Thời gian giữ vé:</div>
                  <div className="text-[24px] font-bold">
                    {formatTime(timeLeft)}
                  </div>
                </div>

                <div className="flex flex-col items-center m-auto">
                  <div
                    className={`w-full flex justify-between px-2 py-1 text-[18px] font-bold ${
                      ticket.discountId ? "line-through" : ""
                    }`}
                  >
                    <div className="">
                      {ticket.discountId ? "Tạm tính" : "Tổng"}
                    </div>
                    <div className="">{totalPrice.toLocaleString()} VNĐ</div>
                  </div>
                  {ticket.discountId && (
                    <div className="w-full flex justify-between px-2 py-1 text-[18px] font-bold text-cinestar-gold">
                      <div className="">Tổng</div>
                      <div className="">
                        {ticket.totalAmount.toLocaleString()} VNĐ
                      </div>
                    </div>
                  )}
                  <div>
                    <Button
                      className="button md:button bg-cinestar-black w-[300px] h-[40px] hidden group items-center  border border-solid border-white"
                      text="THANH TOÁN"
                      colorChange="bg-oragan-yellow-dradient"
                      onClick={handlePayment} // Sử dụng hàm handlePayment
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOutFood;
