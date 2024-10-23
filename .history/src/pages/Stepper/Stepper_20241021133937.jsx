import React from "react";
import { useLocation } from "react-router-dom";

const Stepper = () => {
    const location = useLocation(); // Lấy location
    const { totalPrice, selectedCombos } = location.state || {}; // Lấy dữ liệu từ state

    return (
        <div>
            <h1>Stepper</h1>
            <p>Tổng giá: {totalPrice}</p>
            <h2>Combos đã chọn:</h2>
            <ul>
                {selectedCombos && selectedCombos.map((combo, index) => (
                    <li key={index}>{combo.name}: {combo.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default Stepper;
