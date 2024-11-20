import axios from "axios";

const schedule_base_url = "http://localhost:5006/movies/api/MovieSchedule";

const scheduleService = {
  getScheduleByIdFilm: async (idFilm) => {
    try {
      const response = await axios.get(`${schedule_base_url}/movie/${idFilm}`, {
        headers: {
          "Content-Type": "application/json", // Xác định kiểu dữ liệu
        },
      });
      const data = response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default scheduleService;
