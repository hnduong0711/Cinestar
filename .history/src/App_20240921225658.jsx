import Header from "./components/Header/Header";
import Now from "./components/Now/Now";
import SearchBox from "./components/SearchBox/SearchBox";
import Slider from "./components/Slider/Slider";
import MainLayout from "./layout/MainLayout";
import Homepage from "./pages/Homepage";
import TicketContextWrapper from "./context/TicketContext/TicketContextWrapper";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom"; // Thêm dòng này
import ComingSoon from "./components/ComingSoon/ComingSoon";
import Promotion from "./components/Promotion/Promotion";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-cinestar-black px-1 md:px-2">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
