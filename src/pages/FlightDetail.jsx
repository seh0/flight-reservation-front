import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './FlightDetail.css';

function FlightDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);

  const fetchFlightDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/flights/${id}`);
      setFlight(response.data);
    } catch (error) {
      console.error('항공편 상세 정보를 가져오는 데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchFlightDetail();
  }, [id]);

  if (!flight) {
    return <div>Loading...</div>;
  }

  const handleBookFlight = () => {
    navigate(`/rsv/seat`);
  };

  return (
    <div className="flight-detail-container">
      <h2>항공편 상세 정보</h2>
      <div className="flight-content">
        <table className="flight-detail-table">
          <tbody>
          <tr>
          <th>항공사</th>
          <td>{flight.aircraftType}</td>
        </tr>
        <tr>
          <th>출발 날짜</th>
          <td>{flight.flightDate}</td>
        </tr>
        <tr>
          <th>출발지 / 도착지</th>
          <td>{flight.departure} / {flight.arrival}</td>
        </tr>
        <tr>
          <th>출발 시간 / 도착 시간</th>
          <td>{flight.departureTime} / {flight.arrivalTime}</td>
        </tr>
        <tr>
          <th>총 비행 시간</th>
          <td>{flight.flightDuration}</td>
        </tr>
        <tr>
          <th>총 좌석</th>
          <td>{flight.seatCount}석</td>
        </tr>
        <tr>
          <th>가격</th>
          <td>{flight.price}원~</td>
        </tr>
          </tbody>
        </table>
      </div>

      <div className="button-group">
        <button className="book-button" onClick={handleBookFlight}>
          예매하기
        </button>
      </div>
    </div>
  );
}

export default FlightDetail;
