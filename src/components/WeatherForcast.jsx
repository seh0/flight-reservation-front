import React, { useEffect, useState } from 'react';
import '../style/WeatherForecast.css';

const WeatherForecast = () => {
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForecast = async () => {
            try {
                const today = new Date();
                const nowDate = today.toISOString().slice(0, 10).replace(/-/g, '') + '0600';
                const API_KEY = 'api_key';
                const API_URL = `https://apis.data.go.kr/1360000/MidFcstInfoService/getMidLandFcst?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&dataType=JSON&regId=11B00000&tmFc=${nowDate}`;
                const response = await fetch(API_URL);
                const data = await response.json();
                const item = data.response.body.items.item[0];
                setForecast(item);
            } catch (err) {
                setError('데이터를 불러오는 데 실패했습니다.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchForecast();
    }, []);

    const days = [4, 5, 6, 7];
    const nextDays = [8, 9, 10];

    const getDateLabel = (offset) => {
        const date = new Date();
        date.setDate(date.getDate() + offset);
        const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
        return `${date.getMonth() + 1}월 ${date.getDate()}일 (${weekdays[date.getDay()]})`;
    };

    return (
        <div>
            <h1>날씨 예보</h1>
            <div className="weather-container">
                {loading ? (
                    <div>⏳ 날씨 데이터를 불러오는 중...</div>
                ) : error ? (
                    <div>❌ {error}</div>
                ) : !forecast ? null : (
                    <>
                        <p> 오늘:
                            <span style={{ marginLeft: '10px', fontSize: '16px', color: '#666' }}>
                                {getDateLabel(0)}
                            </span>
                        </p>
                        <div className="weather-cards-wrapper">
                            <div className="weather-cards">
                                {days.map((day) => (
                                    <div key={`day${day}`} className="weather-card">
                                        <h3>{getDateLabel(day)}</h3>
                                        <p>☁ 오전: {forecast[`wf${day}Am`]}</p>
                                        <p>☀ 오후: {forecast[`wf${day}Pm`]}</p>
                                        <p>🌧️ 오전 강수확률: {forecast[`rnSt${day}Am`]}%</p>
                                        <p>🌧️ 오후 강수확률: {forecast[`rnSt${day}Pm`]}%</p>
                                    </div>
                                ))}
                                {nextDays.map((day) => (
                                    <div key={`day${day}`} className="weather-card">
                                        <h3>{getDateLabel(day)}</h3>
                                        <p>☁ 종일: {forecast[`wf${day}`]}</p>
                                        <p>🌧️ 강수확률: {forecast[`rnSt${day}`]}%</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <p style={{ textAlign: 'right', fontSize: '12px', color: 'gray' }}>
                ※ 본 서비스는 <a href="https://www.data.go.kr" target="_blank" rel="noopener noreferrer">공공데이터포털(www.data.go.kr)</a>의
                [기상청_중기예보 조회서비스]를 활용하여 제공됩니다.
            </p>
        </div>
    );
};

export default WeatherForecast;
