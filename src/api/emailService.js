import axios from "axios";

const emailService = {
  getOtp: async (email) => {
    try {
      await axios.get(
        `http://localhost:5006/auth/api/User/forgotPassword/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  },

  resetPass: async (data) => {
    try {
      await axios.post(
        "http://localhost:5006/auth/api/User/resetPassword",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export default emailService;
