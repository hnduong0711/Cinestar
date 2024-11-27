import axios from "axios";

const ticket_base_url = "http://localhost:5006/reservation/api/Ticket";

const ticketService = {
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
};

export default ticketService;
