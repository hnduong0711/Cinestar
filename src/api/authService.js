import axios from "axios";

const login = async (username, password) => {
  try {
    const response = await axios.post(
      "http://localhost:5006/auth/api/Login",
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const token = response.data; // Đảm bảo token có đúng key, ví dụ: response.data.accessToken
    if (token) {
      sessionStorage.setItem("token", token);
      console.log("Đã lưu token");
      return 200;
    } else {
      return null; // Không có token
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return error.status; // Lỗi xảy ra
  }
};

export { login };
