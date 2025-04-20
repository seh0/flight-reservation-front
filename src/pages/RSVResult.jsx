import { useNavigate } from 'react-router-dom';

function RSVResult() {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate(`/flight`);
    };
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>
                최종확인
            </h1>
            <p>최종확인</p>
            <p>최종확인</p>
            <p>최종확인</p>
            <button onClick={handleNext}>완료</button>
            <button onClick={handleGoBack}>뒤로가기</button>
        </div>
    )
}
export default RSVResult