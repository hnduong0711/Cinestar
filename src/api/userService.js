import axios from "axios";

const user_base_url = "http://localhost:5006/auth/api/User";

const userService = {
  getUser: async (id, token) => {
    try {
      const response = await axios.get(`${user_base_url}/${id}`, {
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
  updateUser: async(id, data, token) => {
    try{
      const response = await axios.put(`${user_base_url}/${id}`, data, {
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      return response.data;
    }catch(error){
      console.log(error);
    }
  }
};

export default userService;
