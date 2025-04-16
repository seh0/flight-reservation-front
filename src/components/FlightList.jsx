import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FlightList.css';

function FlightList() {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:5000/flights');
      setFlights(response.data);
    } catch (error) {
      console.error('항공편 데이터를 가져오는 데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/flight/${id}`);
  };

  return (
    <div className="flight-list">
      {flights.map(flight => (
        <div
          key={flight.id}
          className="flight-card"
          onClick={() => handleCardClick(flight.id)}
        >
          <div className="section section-left">
            <h3>{flight.aircraftType}</h3>
            <p>{flight.flightDate}</p>
          </div>
          <div className="section section-center">
            <div className="time-info">
              <p className="time">{flight.departureTime}</p>
              <p className="location"> {flight.departure}</p>
            </div>
            <div className="time-info">
              <p className="flight-duration">
                <span>✈️</span>
                {flight.flightDuration}
              </p>  
            </div>
            <div className="time-info">
              <p className="time">{flight.arrivalTime}</p>
              <p className="location"> {flight.arrival}</p>
            </div>
          </div>
          <div className="section section-right">
            <p className="price"> {flight.price}원 ~</p>
            <p className="seats"> 총 {flight.seatCount} 석</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FlightList;
