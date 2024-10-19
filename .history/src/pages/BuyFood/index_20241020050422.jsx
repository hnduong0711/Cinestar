import React, { useState } from "react";
import ChoseCinema from './ChoseCinema';
import ListCombo from './CompoFirst';
import CheckOutFood from './CheckOutFood';
import Button from "../../components/Button/Button";

const BuyCorn = () => {
    const [selectedCinema, setSelectedCinema] = useState('');
    const [selectedCombos, setSelectedCombos] = useState([]);

    // Xử lý việc chọn combo (có thể được thực hiện trong ListCombo)
    // Hàm để cập nhật selectedCombos từ ListCombo
    const onSelectCombos = (combos) => {
        setSelectedCombos(combos);
    };

    // Hàm để xử lý sự kiện nhấn nút thanh toán
    const handlePayment = () => {
        navigate("/popcorn-drink/stepper", { state: { totalPrice, selectedCombos } }); // Gửi data đến Stepper
    };
    

    return (
        <div>
            <div className="container mx-auto px-4">
                <div className='pt-[8rem] text-center'>
                <ChoseCinema setSelectedCinema={setSelectedCinema} /> {/* Truyền hàm setSelectedCinema */}
                <ListCombo onSelectCombos={onSelectCombos} setSelectedCinema={setSelectedCinema} />
                </div>
            </div>
            <CheckOutFood 
                selectedCinema={selectedCinema} 
                selectedCombos={selectedCombos} 
                onPayment={handlePayment} // Truyền hàm thanh toán vào CheckOutFood
            />
        </div>
    );
};

export default BuyCorn;
