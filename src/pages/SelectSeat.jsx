import { useNavigate } from 'react-router-dom';

function SelectSeat() {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate(`/rsv/detail`);
    };
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>
                좌석선택
            </h1>
            <p>좌석</p>
            <p>좌석</p>
            <p>좌석</p>
            <button onClick={handleNext}>다음단계</button>
            <button onClick={handleGoBack}>뒤로가기</button>
        </div>
    )
}
export default SelectSeat