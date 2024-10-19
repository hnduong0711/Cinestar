import React from "react";
import { useLocation } from "react-router-dom";

const Stepper = () => {
    const location = useLocation();
    const { totalPrice, selectedCombos } = location.state || {}; // Nhận dữ liệu từ state

    return (
        <div className="w-full h-[300px] pt-30 pb-30">
            <h1>Thông tin thanh toán</h1>
            <p>Tổng giá: {totalPrice.toLocaleString()} VNĐ</p>
            <h2>Danh sách combo đã chọn:</h2>
            <ul>
                {selectedCombos && selectedCombos.map((combo, index) => (
                    <li key={index}>{combo.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default Stepper;
