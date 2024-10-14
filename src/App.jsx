
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom"; // Thêm dòng này

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
