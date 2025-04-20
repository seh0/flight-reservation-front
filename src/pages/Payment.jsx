import { useNavigate } from 'react-router-dom';

function Payment() {
    const navigate = useNavigate();

    const handleNext = () => {
        navigate(`/rsv/result`);
    };
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>
                결제
            </h1>
            <p>결제</p>
            <p>결제</p>
            <p>결제</p>
            <button onClick={handleNext}>다음단계</button>
            <button onClick={handleGoBack}>뒤로가기</button>
        </div>
    )
}
export default Payment