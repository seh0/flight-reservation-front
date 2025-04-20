import { Route, Routes, useLocation } from "react-router-dom";
import './App.css';

import Home from "./pages/Home";
import FlightPage from "./pages/FlightPage";
import FlightDetail from "./pages/FlightDetail";
import ReservationLayout from "./layout/ReservationLayout";
import SelectSeat from "./pages/SelectSeat";
import RSVDetail from "./pages/RSVDetail";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPage from "./pages/Mypage";
import Payment from "./pages/Payment";
import RSVResult from "./pages/RSVResult";
function App() {
  const location = useLocation();
  const hideLayoutRoutes = ["/login", "/signup"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);


  return (
    <div>
      {!hideLayout && <Header />}
      <div className="wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/flight" element={<FlightPage />} />
          <Route path="/mypage" element={<MyPage />} />

          <Route element={<ReservationLayout />}>
            <Route path="/flight/:id" element={<FlightDetail />} />
            <Route path="/rsv/seat" element={<SelectSeat />} />
            <Route path="/rsv/detail" element={<RSVDetail />} />
            <Route path="/rsv/payment" element={<Payment />} />
            <Route path="/rsv/result" element={<RSVResult />} />
          </Route>
        </Routes>
      </div>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
