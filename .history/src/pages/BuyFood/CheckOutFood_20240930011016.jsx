import React from "react";

const CheckOutFood = ({ selectedCinema, selectedCombos }) => {
    console.log("Selected Cinema:", selectedCinema); // Kiểm tra giá trị selectedCinema
    console.log("Selected Combos:", selectedCombos); // Kiểm tra giá trị selectedCombos
    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-cinestar-black w-full h-[130px] p-4 mt-auto">
                <hr className="w-full" />
                <div className="container mx-auto px-4">
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

                    {/* Div thứ hai chiếm 40% */}
                    <div className="flex-grow-[4] w-[40%]">
                            Thanh toán
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOutFood;