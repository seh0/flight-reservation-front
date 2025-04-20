import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/SearchFlight.css";

const SearchFlight = ({ onSearch }) => {
  const [tripType, setTripType] = useState("round");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!departure || !arrival || !date) {
      alert("모든 정보를 입력해주세요!");
      return;
    }
    if (tripType === "round" && !returnDate) {
      alert("왕복일 경우 귀국 날짜도 입력해주세요.");
      return;
    }
    // onSearch({ tripType, departure, arrival, date, returnDate });
    navigate("/flight");
  };

  const handleSwap = () => {
    setDeparture(arrival);
    setArrival(departure);
  };

  const handleReset = () => {
    setDeparture("");
    setArrival("");
    setDate("");
    setReturnDate("");
    setTripType("round");
  };

  return (
    <div className="flight-search-box">
      <div className="top-section">
        <div className="trip-tabs">
          <button
            className={tripType === "round" ? "active" : ""}
            onClick={() => setTripType("round")}
          >
            왕복
          </button>
          <button
            className={tripType === "oneway" ? "active" : ""}
            onClick={() => setTripType("oneway")}
          >
            편도
          </button>
        </div>
        <button className="reset-btn" onClick={handleReset}>↻</button>
      </div>

      <div className="middle-section">
        <div className="middle-left">
          <input
            type="text"
            placeholder="출발지 (예: 김포)"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          />
          <button type="button" className="swap-btn" onClick={handleSwap}>
            ⇄
          </button>
          <input
            type="text"
            placeholder="도착지 (예: 제주)"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
          />
        </div>

        <div className="middle-center">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {tripType === "round" && (
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          )}
        </div>
      </div>

      <div className="bottom-section">
        <button className="search-btn" onClick={handleSearch}>검색</button>
      </div>
    </div>
  );
};

export default SearchFlight;
