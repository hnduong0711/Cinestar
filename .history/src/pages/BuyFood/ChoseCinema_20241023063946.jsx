import React, { useState, useEffect } from "react";
import { choseLocationNears } from "../../constants/BuyFoot";


onst ChoseCinema = ({ setSelectedCinema, setSelectedAddress }) => {
    const [selectedCinema, setCinema] = useState('');
    const [selectedAddress, setAddress] = useState('');

    useEffect(() => {
        if (choseLocationNears.length > 0) {
            const defaultCinema = choseLocationNears[0].title.toUpperCase();
            const defaultAddress = choseLocationNears[0].address;
            setCinema(defaultCinema);
            setSelectedCinema(defaultCinema);
            setSelectedAddress(defaultAddress); // Đặt địa chỉ mặc định
        }
    }, [setSelectedCinema, setSelectedAddress]);

    const handleCinestarChange = (event) => {
        const selectedOption = choseLocationNears.find(cinema => cinema.title.toUpperCase() === event.target.value);
        if (selectedOption) {
            setCinema(selectedOption.title.toUpperCase());
            setAddress(selectedOption.address);
            setSelectedCinema(selectedOption.title.toUpperCase());
            setSelectedAddress(selectedOption.address); // Cập nhật địa chỉ
        }
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
                        <option key={choseLocationNear.id} value={choseLocationNear.title.toUpperCase()}>
                            {choseLocationNear.title.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-2 text-white">
                Địa chỉ: {selectedAddress}
            </div>
        </div>
    );
};

export default ChoseCinema;
