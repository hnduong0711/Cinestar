import axios from "axios";

const ticket_base_url = "http://localhost:5006/reservation/api/Ticket";

const ticketService = {
  // tạo vé
  addTicket: async (data, token) => {
    try {
      const response = await axios.post(`${ticket_base_url}`, data, {
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
  // sửa vé
  updateTicket: async(id, data, token) =>  {
    try{
      const response = await axios.put(`${ticket_base_url}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      });
      return response.data;
    }catch(error){
      console.log(error);
    }
  },
  // xóa vé
  deleteTicketById: async (id, token) =>{
    console.log("ID gửi đến API:", id);
    try{
      const response = await axios.delete(`${ticket_base_url}/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      console.log(response.data);
    }catch(error){console.log(error);
    }
  }
};

export default ticketService;
