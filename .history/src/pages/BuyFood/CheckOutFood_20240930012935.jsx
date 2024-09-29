import React from "react";
import Button from "../../components/Button/Button";

const CheckOutFood = ({ selectedCinema, selectedCombos }) => {
    console.log("Selected Cinema:", selectedCinema); // Kiểm tra giá trị selectedCinema
    console.log("Selected Combos:", selectedCombos); // Kiểm tra giá trị selectedCombos
    return (
        <div className="flex flex-col min-h-screen">
            
            {selectedCombos.length > 0 && (
                <div className="bg-cinestar-black w-full h-[130px] p-4 fixed bottom-0 left-0">
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
                                    <span key={index} className="text-white text-[13px] font-content">{combo.content}</span>
                                ))}
                            </div>
                        </div>
                        <div className="w-[1px] bg-gray-300 mx-4"></div>


                    {/* Div thứ hai chiếm 40% */}
                        <div className="flex-grow-[4] w-[40%] pr-15">
                            <div className="flex items-center">
                                <div className="w-[50%] text-white font-content">Tạm tính</div>
                                <div className="text-white font-content text-[30px]">20.000 Đ</div>
                            </div>
                            <div>
                            <Button
                                icon={Popcorn}
                                className="button md:button bg-cinestar-purple w-[125px] h-[40px] text-white hidden group"
                                text="Đặt bắp nước"
                                colorChange="bg-orange-yellow-gradient"
                                onClick={handleClick} // Thêm hàm onClick

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

