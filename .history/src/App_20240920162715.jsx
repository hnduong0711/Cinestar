
import Header from "./components/Header/Header";
import Now from "./components/Now/Now";
import SearchBox from "./components/SearchBox/SearchBox";
import Slider from "./components/Slider/Slider";
import MainLayout from "./layout/MainLayout";
import Homepage from "./pages/Homepage";
import SearchContextWrapper from "./context/SearchContext/SearchContextWrapper";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from 'react-router-dom'; // Thêm dòng này

function App() {
  return (
    <BrowserRouter>
      <div className="bg-cinestar-black md:px-2">
        <Header />
        <Slider />
        <SearchContextWrapper>
          <SearchBox />
        </SearchContextWrapper>
        <AppRouter />
        <Now />
      </div>
    </BrowserRouter>
  );
}

export default App;