import { useEffect, useState } from "react";
import { accessAccount } from "../../api/authService";

const AccessAccount = () => {
  const [countdown, setCountdown] = useState(7); // Số giây đếm ngược ban đầu

  useEffect(() => {
    const currentUrl = window.location.href;
    const queryString = currentUrl.split("?")[1];
    const newUrl = `http://localhost:5006/auth/api/Mail/confirm?${queryString}`;

    // Gửi yêu cầu xác nhận tài khoản
    accessAccount(newUrl);

    // Tạo bộ đếm thời gian
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer); // Dừng đếm khi hết thời gian
          window.location.href = "http://localhost:5173/login"; // Chuyển hướng
        }
        return prev - 1; // Giảm giá trị đếm ngược
      });
    }, 1000); // Cập nhật mỗi giây

    return () => clearInterval(timer); // Dọn dẹp bộ đếm thời gian khi component unmount
  }, []);

  return (
    <div className="bg-cinestar-black text-white text-2xl pt-[9rem] h-[500px] flex flex-col items-center justify-center font-title">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="green"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-20 animate-scaleLoop p-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <p>Xác nhận tài khoản thành công!</p>
      <p className="pt-4">
        Bạn sẽ chuyển tới trang đăng nhập sau {countdown} giây...
      </p>
    </div>
  );
};

export default AccessAccount;
