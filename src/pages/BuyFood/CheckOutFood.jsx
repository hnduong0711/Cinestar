import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom"; // Thêm dòng này

const CheckOutFood = ({
  schedule,
  selectedCombos,
  onPayment,
  selectedSeats,
}) => {
  const navigate = useNavigate();

  // tạo sticky
  const [isAtFooter, setIsAtFooter] = useState(false);
  const paymentBarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector(".footer"); // Class của footer

      if (footer && paymentBarRef.current) {
        // Kiểm tra nếu ref còn tồn tại
        const footerTop = footer.getBoundingClientRect().top;
        const paymentBarHeight = paymentBarRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        // Kiểm tra nếu thanh bar chạm vào footer
        setIsAtFooter(footerTop <= windowHeight - paymentBarHeight + 75);
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
  const totalPrice = Object.values(totalPriceById).reduce(
    (total, price) => total + price,
    0
  ) + totalPriceBySeats;

  const handlePayment = () => {
    navigate("stepper", { state: { totalPrice, selectedCombos } }); // Gửi data đến Stepper
  };

  console.log("seat ", selectedSeats);

  return (
    <div className="flex flex-col">
      {totalPrice > 0 && (
        <div
          ref={paymentBarRef}
          className={`payment-bar bg-cinestar-black w-full h-[130px] p-4 fixed bottom-0 z-10 left-0 transition-all duration-200 ${
            isAtFooter
              ? "absolute top-auto bottom-auto w-full z-10"
              : "fixed bottom-0 w-full z-10"
          }`}
        >
          <hr className="w-full" />
          <div className="container mx-auto px-4 mt-5">
            <div className="flex">
              <div className="flex-grow-[6] w-[60%]">
                <div>
                  <p className="text-[24px] text-white font-title">Duong</p>
                </div>
                <div>
                  {/* Hiển thị thông tin content của các combo đã chọn */}
                  {selectedCombos.map((combo, index) => (
                    <span
                      key={index}
                      className="text-white text-[13px] font-content"
                    >
                      {index > 0 && ", "}{" "}
                      {/* Thêm dấu phẩy nếu không phải combo đầu tiên */}
                      {combo.content}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-[1px] bg-gray-300 mx-4"></div>
              {/* Div 2 */}
              <div className="flex-grow-[4] w-[40%] pr-15">
                <div className="flex items-center">
                  <div className="w-[50%] text-white font-content">
                    Tạm tính
                  </div>
                  <div className="text-white font-content text-[15px]">
                    {totalPrice.toLocaleString()} VNĐ
                  </div>
                </div>
                <div>
                  <Button
                    className="button md:button bg-cinestar-black w-[400px] h-[40px] text-white hidden group items-center font-content border border-solid border-white"
                    text="THANH TOÁN"
                    colorChange="bg-oragan-yellow-dradient"
                    onClick={handlePayment} // Sử dụng hàm handlePayment
                  />
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
