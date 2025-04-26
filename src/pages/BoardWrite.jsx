import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/BoardWrite.css";

const BoardWrite = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newBoard = {
            title,
            content,
            author,
            created_at: new Date().toISOString(),
            views: 0,
        };

        axios
            .post("http://localhost:5000/boards", newBoard)
            .then(() => {
                setTitle("");
                setContent("");
                setAuthor("");
                navigate("/board");
            })
            .catch((error) => {
                console.error("게시판 작성 실패:", error);
                alert("게시판 작성 중 오류가 발생했습니다.");
            });
    };

    return (
        <div>
            <h1 className="board-write-header">게시글 작성</h1>
            <form className="board-write-form" onSubmit={handleSubmit}>
                <div>
                    <label className="board-write-label">제목:</label>
                    <input
                        className="board-write-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="board-write-label">내용:</label>
                    <textarea
                        className="board-write-textarea"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="board-write-label">글쓴이:</label>
                    <input
                        className="board-write-input"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <button className="board-write-button" type="submit">작성하기</button>
                <button onClick={() => navigate("/board")}>목록으로</button>
            </form>
        </div>
    );
};

export default BoardWrite;
