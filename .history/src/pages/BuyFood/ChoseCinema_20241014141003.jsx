import React, { useState, useEffect } from "react";
import { choseLocationNears } from "../../constants/BuyFoot";

const ChoseCinema = ({ setSelectedCinema }) => {
    const [selectedCinema, setCinema] = useState('');

    // Thiết lập giá trị mặc định trong useEffect
    useEffect(() => {
        const defaultCinema = choseLocationNears[0].title.toUpperCase(); // Giá trị mặc định là giá trị đầu tiên
        setCinema(defaultCinema);
        setSelectedCinema(defaultCinema); // Cập nhật giá trị trong component cha
    }, [setSelectedCinema]); // Chạy khi component được mount

    // Xử lý sự kiện khi chọn rạp chiếu phim
    const handleCinestarChange = (event) => {
        setCinema(event.target.title.toUpperCase());
        setSelectedCinema(event.target.value);
        console.log('Rạp đã chọn:', event.target.value);
    };

    console.log(selectedCinema);

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
                        <option key={choseLocationNear.id} value={choseLocationNear.title.toUpperCase()}>
                            {choseLocationNear.title.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default ChoseCinema;
