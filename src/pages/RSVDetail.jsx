import { useNavigate } from 'react-router-dom';

function RSVDetail() {

    const navigate = useNavigate();

    const handleNext = () => {
        navigate(`/rsv/payment`);
    };
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>
                추가정보 입력
            </h1>
            <p>추가정보</p>
            <p>추가정보</p>
            <p>추가정보</p>
            <button onClick={handleNext}>다음단계</button>
            <button onClick={handleGoBack}>뒤로가기</button>
        </div>
    )
}
export default RSVDetail