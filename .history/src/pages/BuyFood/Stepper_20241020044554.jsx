// Stepper.jsx
import React from 'react';

const Stepper = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Quy trình thanh toán</h2>
            {/* Nội dung của stepper */}
            <div className="step mb-2">Bước 1: Thông tin người dùng</div>
            <div className="step mb-2">Bước 2: Xác nhận đơn hàng</div>
            <div className="step mb-4">Bước 3: Thanh toán</div>
            <a href="/" className="mt-4 bg-blue-500 text-white p-2 rounded">Quay lại</a>
        </div>
    );
};

export default Stepper;
