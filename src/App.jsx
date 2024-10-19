import SearchContextWrapper from "./context/SearchContext/SearchContextWrapper";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom"; // Thêm dòng này

function App() {
  return (
    <BrowserRouter>
      <SearchContextWrapper>
        <div className="bg-cinestar-black px-1 md:px-2">
          <AppRouter />
        </div>
      </SearchContextWrapper>
    </BrowserRouter>
  );
}

export default App;
