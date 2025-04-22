import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FlightList from "../components/FlightList";
import SearchFlight from "../components/SearchFlight";  // SearchFlight 컴포넌트 임포트
import "../style/FlightPage.css";

function FlightPage() {
    const location = useLocation();  // useLocation 훅을 사용하여 상태 받기
    const [filters, setFilters] = useState(null);  // 검색 데이터 필터
    const [allFlights, setAllFlights] = useState([]);  // 모든 항공편 리스트

    // 1. 페이지가 로드될 때마다 상태 초기화
    useEffect(() => {
        // `location.state`로 검색 데이터를 전달받는 로직
        const searchData = location.state;  // 전달받은 상태에서 검색 데이터를 추출

        if (searchData) {
            setFilters(searchData);  // 검색 데이터가 있으면 필터 상태 설정
            fetchFlights(searchData);  // 해당 필터로 항공편 데이터를 요청
        } else {
            // 검색 없이 처음 페이지에 진입하면 전체 항공편 리스트 요청
            setFilters(null);  // 필터 상태 초기화
            fetchFlights();  // 필터 없이 전체 항공편 데이터 요청
        }
    }, [location.state]);  // location.state가 변경될 때마다 실행

    // 항공편 데이터 요청 함수
    const fetchFlights = async (searchData = null) => {
        try {
            let uri = "http://localhost:8080/api/flights";
            let params = {};

            // 검색 조건이 있을 경우 필터링된 데이터 요청
            if (searchData) {
                params = { 
                    tripType: searchData.tripType, 
                    departure: searchData.departure, 
                    arrival: searchData.arrival, 
                    date: searchData.date, 
                    returnDate: searchData.returnDate 
                };
                uri = searchData.tripType === "round" 
                    ? "http://localhost:8080/api/flights/search/split" 
                    : "http://localhost:8080/api/flights/search";
            }

            // API 호출
            const res = await axios.get(uri, { params });
            setAllFlights(res.data);  // 응답 받은 데이터로 리스트 설정
        } catch (error) {
            console.error("항공편 데이터 불러오기 실패", error);
            setAllFlights([]);  // 에러가 발생하면 빈 배열로 설정
        }
    };

    // 2. 검색창에서 검색을 새로 할 경우
    const handleSearch = (searchData) => {
        setFilters(searchData);  // 새로운 검색 데이터를 필터에 반영
        fetchFlights(searchData);  // 새로운 필터로 API 요청
    };

    return (
        <div>
            {/* FlightPage 내에서 검색창 추가 */}
            <SearchFlight onSearch={handleSearch} /> {/* 기존 검색 기능 유지하면서 FlightPage 내에서도 사용 */}

            {/* 항공편 리스트 출력 */}
            <FlightList filters={filters} allFlights={allFlights} />
        </div>
    );
}

export default FlightPage;
