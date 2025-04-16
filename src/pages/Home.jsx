import { useNavigate } from "react-router-dom"

function Home() {

    const navigate = useNavigate();

    return (
        <div>
            <h1>HOME</h1>
            <button onClick={() => { navigate("/flight") }}>Fly</button>
        </div>
    )
}

export default Home