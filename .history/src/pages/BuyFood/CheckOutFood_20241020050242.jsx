import React from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom"; // Thêm dòng này



// Hàm chuyển chuỗi giá tiền sang số nguyên
const parsePrice = (price) => {
    const parsed = parseInt(price.replace(/\D/g, ""), 10);
    console.log(`Parsed Price: ${price} -> ${parsed}`); // Kiểm tra giá trị sau khi parse
    return parsed;
};



const CheckOutFood = ({ selectedCinema, selectedCombos, onPayment }) => {

    const navigate = useNavigate();
    const totalPriceById = selectedCombos.reduce((acc, combo) => {
        const price = parsePrice(combo.price);
        const quantity = combo.quantity || 1; // Giả định số lượng mặc định là 1 nếu không có

        // Tính tổng giá cho combo với số lượng
        const totalComboPrice = price * quantity;

        if (acc[combo.id]) {
            acc[combo.id] += totalComboPrice; // Nếu đã có ID này, cộng thêm vào
        } else {
            acc[combo.id] = totalComboPrice; // Nếu chưa có, khởi tạo giá trị
        }
        return acc;
    }, {});

    // Tính tổng tất cả giá tiền (cộng dồn các ID)
    const totalPrice = Object.values(totalPriceById).reduce(
        (total, price) => total + price,
        0
    );

    return (
        <div className="flex flex-col">
            
            {selectedCombos.length > 0 && (
                <div className="bg-cinestar-black w-full h-[130px] p-4 fixed bottom-10 left-0">
                <hr className="w-full" />
                <div className="container mx-auto px-4 mt-5">
                <div className="flex">
                    {/* Div đầu tiên chiếm 60% */}
                        <div className="flex-grow-[6] w-[60%]">
                            <div>
                                <p className="text-[24px] text-white font-title">{selectedCinema}</p>
                            </div>
                            <div>
                                {/* Hiển thị thông tin content của các combo đã chọn */}
                                {selectedCombos.map((combo, index) => (
                                    <span key={index} className="text-white text-[13px] font-content">
                                        {index > 0 && ', '} {/* Thêm dấu phẩy nếu không phải combo đầu tiên */}
                                        {combo.content}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="w-[1px] bg-gray-300 mx-4"></div>


                    {/* Div thứ hai chiếm 40% */}
                        <div className="flex-grow-[4] w-[40%] pr-15">
                            <div className="flex items-center">
                                <div className="w-[50%] text-white font-content">Tạm tính</div>
                                <div className="text-white font-content text-[15px]">
                                    {totalPrice.toLocaleString()} VNĐ
                                </div>
                                
                            </div>
                            <div>
                            <Button
                                    className="button md:button bg-cinestar-black w-[400px] h-[40px] text-white hidden group items-center font-content border border-solid border-white"
                                    text="THANH TOÁN"
                                    colorChange="bg-oragan-yellow-dradient"
                                    onClick={onPayment} // Sử dụng hàm thanh toán
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

