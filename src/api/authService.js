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
    const token = response.data.accessToken;
    if (token) {
      saveToken(token);
      verifyToken(token);
      return 200;
    } else {
      return null; // Không có token
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return error.status; // Lỗi xảy ra
  }
};

// Lưu token và thời hạn
const saveToken = (token) => {
  const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode payload của JWT
  const expirationTime = decodedToken.exp * 1000; // Chuyển `exp` từ giây sang milliseconds
  sessionStorage.setItem(
    "authToken",
    JSON.stringify({ token, expirationTime })
  );
};

// Kiểm tra hạn dùng của token
const checkTokenValidity = async () => {
  const storedData = sessionStorage.getItem("authToken");
  if (!storedData) return;

  const { token, expirationTime } = JSON.parse(storedData);
  const currentTime = Date.now();

  if (currentTime >= expirationTime) {
    console.log("Token has expired");
    // Gửi API kiểm tra token hoặc thực hiện hành động khác
    await verifyToken(token);
  } else {
    console.log("Token is still valid");
    const remainingTime = expirationTime - currentTime;
    setTimeout(() => checkTokenValidity(), remainingTime); // Đặt kiểm tra lại khi token gần hết hạn
  }
};

// Kiểm tra token còn hạn dùng không
const verifyToken = async (token) => {
  try {
    const response = await axios.get("http://localhost:5006/auth/api/Verify", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response) {
      const username = response.data.username;
      sessionStorage.setItem("username", JSON.stringify({ username }));
    } else {
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("username");
    }
  } catch (error) {
    console.error("Error verifying token:", error);
  }
};

export { login };
