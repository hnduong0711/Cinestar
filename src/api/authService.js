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
      checkTokenValidity();
      return 200;
    } else {
      return null; // Không có token
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return error.status; // Lỗi xảy ra
  }
};

// Lưu token và thời hạn --> lưu vào sessionStorage
const saveToken = (token) => {
  const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode payload của JWT
  const expirationTime = decodedToken.exp * 1000; // Chuyển `exp` từ giây sang milliseconds
  sessionStorage.setItem(
    "authToken",
    JSON.stringify({ token, expirationTime })
  );
};

// Kiểm tra hạn dùng của token --> settimeout cho thời hạn token
const checkTokenValidity = async () => {
  const storedData = sessionStorage.getItem("authToken");
  if (!storedData) return;

  const { token, expirationTime } = JSON.parse(storedData);
  const currentTime = Date.now();

  const isTokenValid = await verifyToken(token);
  if (currentTime >= expirationTime) {
    if (!isTokenValid) {
      sessionStorage.clear();
      window.location.href = "/login";
      alert("Phiên đăng nhập hết hạn vui lòng đăng nhập lại !");
    }
  } else {
    console.log("Token is still valid");
    const remainingTime = expirationTime - currentTime;
    setTimeout(() => checkTokenValidity(), remainingTime); // Đặt kiểm tra lại khi token gần hết hạn
  }
};

// Kiểm tra token còn hạn dùng không, --> trả về username nếu hợp lệ và false nếu không hợp lệ
const verifyToken = async (token) => {
  try {
    const response = await axios.get("http://localhost:5006/auth/api/Verify", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 && response.data) {
      const username = response.data.username;
      const id = response.data.id;

      sessionStorage.setItem("username", JSON.stringify({ id, username }));
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error verifying token:", error);
  }
};

const registerUser = async (username, password, email) => {
  try {
    const body = {
      username,
      password,
      email,
      roles: ["USER"],
      departments: [],
    };

    const response = await axios.post(
      "http://localhost:5006/auth/api/Register",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const token = response.data.accessToken;
    saveToken(token);
    verifyToken(token);
  } catch (error) {
    // Xử lý lỗi
    console.error(
      "Error during registration:",
      error.response?.data || error.message
    );
  }
};

const getOTP = async (email, token) => {
  try {
    const response = await axios.get(
      `http://localhost:5006/auth/api/Mail/confirm?email=${email}&token=${token}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export { login, registerUser, verifyToken };
