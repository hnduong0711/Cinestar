import React, { useState } from "react";
import { choseLocationNears } from "../../constants/BuyFoot";

const ChoseCinema = ({ setSelectedCinema }) => { // Nhận setSelectedCinema từ props
    const [selectedCinema, setCinema] = useState(choseLocationNears[0].value); // Thiết lập giá trị mặc định

    // Xử lý sự kiện khi chọn rạp chiếu phim
    const handleCinestarChange = (event) => {
        setCinema(event.target.value);
        setSelectedCinema(event.target.value); // Cập nhật giá trị trong component cha
        console.log('Rạp đã chọn:', event.target.value);
    };

    return (
        <div>
            <div className="text-center mt-[50px] mb-[5px]">
                <h2 className="text-cinestar-custom-white text-[40px] font-medium pb-[4rem] font-title uppercase">Chọn rạp gần bạn</h2>
            </div>
            <div>
                <select 
                    id="cinestar" 
                    value={selectedCinema} 
                    onChange={handleCinestarChange} 
                    className="border border-gray-300 rounded p-2 bg-white w-[850px] h-[62px] text-[25px] font-title font-medium tracking-[0.09em]"
                >
                    {choseLocationNears.map((choseLocationNear) => (
                        <option key={choseLocationNear.id} value={choseLocationNear.value}>
                            {choseLocationNear.title.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ChoseCinema;