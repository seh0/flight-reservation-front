import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../style/Mypage.css"

function MyPage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = localStorage.getItem("user");
        if (loggedUser) {
            setUser(JSON.parse(loggedUser));
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="my-page">
            {user ? (
                <>
                    <h2>My Page</h2>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default MyPage;
