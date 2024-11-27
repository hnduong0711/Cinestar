import axios from "axios";

const food_case_url = "http://localhost:5006/reservation/api/Food";

const foodService = {
  getAllFood: async (token) => {
    try {
      const response = await axios.get(food_case_url, {
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

export default foodService;
