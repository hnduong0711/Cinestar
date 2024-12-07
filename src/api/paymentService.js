import axios from "axios";

const payment_base_url = "http://localhost:5006/payment/api/Payment";

const paymentSerVice = {
  createPayment: async (data, token) => {
    console.log("api token", token);
    console.log("api data", data);
    console.log("api url", `${payment_base_url}/create_payment_url`);

    try {
      const response = await axios.post(
        `${payment_base_url}/create_payment_url`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },

  acceptPayment: async (url, token) => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default paymentSerVice;
