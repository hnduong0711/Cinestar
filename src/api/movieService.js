import axios from "axios";

const movie_base_url = "http://localhost:5006/movies/api/Movie";

const movieService = {
  // Lấy tất cả movie
  getAllMoives: async (page = 1, limit = 10, filters = {}) => {
    try {
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
  // Tìm kiếm theo tên
  getFilmByName: async (name) => {
    try {
      const response = await axios.get(`${movie_base_url}/getAll`, {
        params: { name },
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.records;
    } catch (error) {
      console.error("Error in getFilmByName: ", error.message);
      return null;
    }
  },
  // lấy phim theo id phim
  getFilmById: async (id) => {
    try {
      const response = await axios.get(`${movie_base_url}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('api ',response.data);
      
      return response.data;
    } catch (error) {
      console.error("Error in getFilmByName: ", error.message);
      return null;
    }
  }
  
};

export default movieService;
