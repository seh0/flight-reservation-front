import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

function RSVResult() {
    const { flight, selectedSeats, contact, request } = useSelector((state) => state.reservation);
    const [status, setStatus] = useState('idle'); // 'idle' | 'saving' | 'success' | 'error'

    const formatTime = (str) =>
        new Date(str).toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

    useEffect(() => {
        const saveReservation = async () => {
            setStatus('saving');

            const loggedUser = localStorage.getItem('user');
            const user = loggedUser ? JSON.parse(loggedUser) : null;

            const reservationData = {
                flight,
                selectedSeats,
                contact,
                request,
                userId: user?.id,
                username: user?.username,
                paymentComplete: true,
                reservedAt: new Date().toISOString(),
            };

            try {
                await axios.post('http://localhost:5000/reservations', reservationData);
                setStatus('success');
            } catch (error) {
                console.error('예약 저장 실패:', error);
                setStatus('error');
            }
        };

        saveReservation();
    }, [flight, selectedSeats, contact, request]);

    return (
        <div style={{ padding: '20px' }}>
            <h1> 예약 최종 확인</h1>

            {status === 'saving' && <p>예약 정보를 저장 중입니다...</p>}
            {status === 'success' && <p style={{ color: 'green' }}> 예약이 성공적으로 저장되었습니다!</p>}
            {status === 'error' && <p style={{ color: 'red' }}> 예약 저장에 실패했습니다. 다시 시도해주세요.</p>}

            <hr />

            <h3>선택한 항공편</h3>
            <div style={{ marginBottom: '20px' }}>
                <strong>항공사:</strong> {flight.aircraftType} <br />
                <strong>출발날짜:</strong> {flight.departureTime.split("T")[0]} <br />
                <strong>출발지:</strong> {flight.departureName} <br />
                <strong>도착지:</strong> {flight.arrivalName} <br />
                <strong>출발 시간:</strong> {formatTime(flight.departureTime)} <br />
                <strong>도착 시간:</strong> {formatTime(flight.arrivalTime)} <br />
            </div>

            <h3>선택한 좌석</h3>
            <p>{selectedSeats.join(', ')} 번</p>

            <h3>연락처</h3>
            <p>{contact}</p>

            <h3>요청사항</h3>
            <p>{request || '없음'}</p>
        </div>
    );
}

export default RSVResult;
