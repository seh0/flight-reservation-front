import { Route, Routes } from "react-router-dom";
import './App.css';

import Home from "./pages/Home";
import FlightPage from "./pages/FlightPage";
import FlightDetail from "./pages/FlightDetail";
import ReservationLayout from "./layout/ReservationLayout";
import SelectSeat from "./pages/SelectSeat";
import InputDetail from "./pages/InputDetail";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flight" element={<FlightPage />} />

        <Route element={<ReservationLayout />}>
          <Route path="/flight/:id" element={<FlightDetail />} />
          <Route path="/rsv/seat" element={<SelectSeat />} />
          <Route path="/rsv/detail" element={<InputDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
