import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../style/AirportWeather.css';

const airports = [
  { name: '인천공항', code: 'RKSI' },
  { name: '김포공항', code: 'RKSS' },
  { name: '양양공항', code: 'RKNY' },
  { name: '청주공항', code: 'RKTU' },
  { name: '대구공항', code: 'RKTN' },
  { name: '무안공항', code: 'RKJB' },
  { name: '김해공항', code: 'RKPK' },
  { name: '제주공항', code: 'RKPC' }
];

const AirportWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [airportCode, setAirportCode] = useState('RKSI');

  const fetchWeather = async (airPortCd) => {
    setLoading(true);
    setError(null);

    try {
      const today = new Date();
      const baseDate = today.toISOString().slice(0, 10).replace(/-/g, '');
      const API_KEY = 'api_key';
      const url = `https://apis.data.go.kr/1360000/AirPortService/getAirPort?serviceKey=${API_KEY}&numOfRows=0&pageNo=0&dataType=JSON&base_date=${baseDate}&base_time=0600&airPortCd=${airPortCd}`;
      const response = await axios.get(url);

      const result = response.data.response;

      if (result.header.resultCode === '00') {
        const item = result.body.items.item[0];
        setWeatherData(item);
      } else {
        setError('데이터를 불러오는 데 실패했습니다.');
      }
    } catch (err) {
      setError(`오류 발생: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(airportCode);
  }, [airportCode]);

  const handleAirportChange = (code) => {
    setAirportCode(code);
  };

  return (
    <div>
      <h1>공항별 기상정보</h1>
      <div className="airport-container">
        <div className="button-group">
          {airports.map((airport) => (
            <button
              key={airport.code}
              onClick={() => handleAirportChange(airport.code)}
              className={`airport-button ${airport.code === airportCode ? 'active' : ''}`}
            >
              {airport.name}
            </button>
          ))}
        </div>

        {loading && <div>불러오는 중...</div>}
        {error && <div>{error}</div>}
        {!loading && !error && weatherData && (
          <div>
            <h2>{weatherData.title}</h2>
            <p style={{ textAlign: 'right' }}>{weatherData.tm}</p>
            <h3>{weatherData.summary}</h3>
            <p><strong>전망:</strong><br />{weatherData.outlook}</p>
            <p><strong>예보:</strong><br />{weatherData.forecast}</p>
            <p><strong>경고:</strong><br />{weatherData.warn}</p>
          </div>
        )}
      </div>
      <p style={{ textAlign: 'right', fontSize: '12px', color: 'gray' }}>
        ※ 본 서비스는 <a href="https://www.data.go.kr" target="_blank" rel="noopener noreferrer">공공데이터포털(www.data.go.kr)</a>의
        [기상청_공항별 날씨 예보 조회서비스]를 활용하여 제공됩니다.
      </p>
    </div>
  );
};

export default AirportWeather;
