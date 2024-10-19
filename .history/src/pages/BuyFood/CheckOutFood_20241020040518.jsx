import React from "react";
import Button from "../../components/Button/Button";

const CheckOutFood = ({ selectedCinema, selectedCombos }) => {
    console.log("Selected Cinema:", selectedCinema); // Kiểm tra giá trị selectedCinema
    console.log("Selected Combos:", selectedCombos); // Kiểm tra giá trị selectedCombos
    // Tính tổng giá tiền của tất cả combo
    // Hàm chuyển chuỗi giá tiền về số
const parsePrice = (price) => parseInt(price.replace(/\D/g, ""), 10);

// Hàm nhóm và cộng dồn chi phí dựa trên ID
const calculateTotalById = (combos) => {
    const groupedCombos = combos.reduce((acc, combo) => {
        if (!acc[combo.id]) acc[combo.id] = { ...combo, total: 0 };
        acc[combo.id].total += parsePrice(combo.price);
        return acc;
    }, {});

    return Object.values(groupedCombos); // Trả về mảng các combo đã nhóm
};

// Hàm tính tổng tất cả chi phí
const calculateGrandTotal = (groupedCombos) =>
    groupedCombos.reduce((total, combo) => total + combo.total, 0);

// Sử dụng các hàm trên
const groupedCombos = calculateTotalById(CompoFoods);
const grandTotal = calculateGrandTotal(groupedCombos);

console.log("Các combo đã nhóm:", groupedCombos);
console.log("Tổng chi phí:", grandTotal + " VND");



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
                                        {totalPrice} VNĐ
                                    </div>
                                
                            </div>
                            <div>
                                <Button
                                    
                                    className="button md:button bg-cinestar-black w-[400px] h-[40px] text-white hidden group items-center font-content border border-solid border-white"
                                    text="THANH TOÁN"
                                    colorChange="bg-oragan-yellow-dradient"
                                    
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

