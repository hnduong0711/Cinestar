import axios from "axios";

const movie_base_url = "http://localhost:5006/movies/api/Movie";

const movieService = {
  // Lấy tất cả movie
  getAllMoives: async (page = 1, limit = 10, filters = {}) => {
    try {
      const token = sessionStorage.getItem("token");
      const { name, director, actor, genres } = filters;
      const response = await axios.get(`${movie_base_url}/getAll`, {
        params: {
          page,
          limit,
          name,
          director,
          actor,
          genres: genres?.join(","),
        },
        headers: {
          Authorization: `Bearer ${token}`, // Truyền token vào header
          "Content-Type": "application/json", // Xác định kiểu dữ liệu
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  // Thêm 1 movie
  // Cập nhật 1 movie
};

export default movieService;
