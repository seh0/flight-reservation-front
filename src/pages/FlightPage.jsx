import React, { useState } from "react";
import FlightList from "../components/FlightList";
import './FlightPage.css';

function FlightPage() {
    const [airline, setAirline] = useState("");
    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    const [date, setDate] = useState("");
    const [price, setPrice] = useState("");

    const swapCities = () => {
        setDeparture(arrival);
        setArrival(departure);
    };

    const handleReset = () => {
        setAirline("");
        setDeparture("");
        setArrival("");
        setDate("");
        setPrice("");
    };

    return (
        <div className="flight-page">
            <div className="banner">
                <img
                    src="/images/img1.jpg"
                    alt="Banner Image"
                />
            </div>

            <div className="search-box">
                <h2>항공편 검색</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="airline">항공 이름</label>
                        <select
                            id="airline"
                            name="airline"
                            value={airline}
                            onChange={(e) => setAirline(e.target.value)}
                        >
                            <option value="">항공 선택</option>
                            <option value="airline1">대한 항공</option>
                            <option value="airline2">제주 항공</option>
                            <option value="airline3">아시아나항공</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">날짜</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">가격</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="최소 가격"
                            value={price}
                            step="10000"
                            min="0"
                            onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (val % 10000 === 0 || e.target.value === "") {
                                    setPrice(e.target.value);
                                }
                            }}
                        />

                    </div>

                    <div className="form-group flex-inputs">
                        <input
                            type="text"
                            id="departure"
                            name="departure"
                            placeholder="출발지"
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                        />
                        <button type="button" className="swap-btn" onClick={swapCities}>⇄</button>
                        <input
                            type="text"
                            id="arrival"
                            name="arrival"
                            placeholder="도착지"
                            value={arrival}
                            onChange={(e) => setArrival(e.target.value)}
                        />
                    </div>

                    <div className="button-group">
                        <button type="button" className="search-btn">
                            검색
                        </button>
                        <button type="button" className="reset-btn" onClick={handleReset}>
                            초기화
                        </button>
                    </div>
                </form>
            </div>

            <div className="list-section">
                <FlightList />
            </div>
        </div>
    );
}

export default FlightPage;
