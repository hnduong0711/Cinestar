import React, { useState, useEffect } from 'react'; // Thêm useState và useEffect

    const ChoseCinema = ({ setSelectedCinema, setSelectedAddress }) => { // Sửa lại ở đây
    const [selectedCinema, setCinema] = useState('');
    const [selectedAddress, setAddress] = useState('');

    // Thiết lập giá trị mặc định trong useEffect
    useEffect(() => {
        if (choseLocationNears.length > 0) {
            const defaultCinema = choseLocationNears[0].title.toUpperCase(); // Giá trị mặc định
            const defaultAddress = choseLocationNears[0].address; // Địa chỉ mặc định
            setCinema(defaultCinema);
            setSelectedCinema(defaultCinema); // Cập nhật giá trị trong component cha
            setSelectedAddress(defaultAddress); // Cập nhật địa chỉ
        }
    }, [setSelectedCinema, setSelectedAddress]); // Chạy khi component được mount

    // Xử lý sự kiện khi chọn rạp chiếu phim
    const handleCinestarChange = (event) => {
        const selectedOption = choseLocationNears.find(cinema => cinema.title.toUpperCase() === event.target.value);
        if (selectedOption) {
            setCinema(selectedOption.title.toUpperCase());
            setAddress(selectedOption.address); // Cập nhật địa chỉ tương ứng
            setSelectedCinema(selectedOption.title.toUpperCase()); // Cập nhật rạp chiếu phim
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
