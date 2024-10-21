import TicketContextWrapper from "./context/TicketContext/TicketContextWrapper";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter } from "react-router-dom"; // Thêm dòng này

function App() {
  return (
    <BrowserRouter>
      <TicketContextWrapper>
        <div className="bg-cinestar-black px-1 md:px-2">
          <AppRouter />
        </div>
      </TicketContextWrapper>
    </BrowserRouter>
  );
}

export default App;
