import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../style/BoardEdit.css';

const BoardEdit = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [pinned, setPinned] = useState(false);
    const { boardId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8090/api/boards/${boardId}`)
            .then((response) => {
                const board = response.data;
                setTitle(board.title);
                setContent(board.content);
                setAuthor(board.author);
                setPinned(board.pinned);
            })
            .catch((error) => {
                console.error("게시글 불러오기 실패:", error);
                alert("게시글을 불러오는 데 실패했습니다.");
            });
    }, [boardId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedBoard = {
            title,
            content,
            author,
            pinned,
        };

        axios
            .put(`http://localhost:8090/api/boards/${boardId}`, updatedBoard)
            .then(() => {
                navigate(`/board/${boardId}`);
            })
            .catch((error) => {
                console.error("게시글 수정 실패:", error);
                alert("게시글 수정 중 오류가 발생했습니다.");
            });
    };

    const handleDelete = () => {
        if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
            axios
                .delete(`http://localhost:8090/api/boards/${boardId}`)
                .then(() => {
                    navigate("/board");
                })
                .catch((error) => {
                    console.error("게시글 삭제 실패:", error);
                    alert("게시글 삭제 중 오류가 발생했습니다.");
                });
        }
    };

    return (
        <div className="board-edit-container">
            <h1 className="board-edit-title">게시글 수정</h1>
            <form className="board-edit-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">제목:</label>
                    <input
                        className="form-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">내용:</label>
                    <textarea
                        className="form-textarea"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label className="form-label">글쓴이:</label>
                    <input
                        className="form-input"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">
                        상단 고정:
                        <input
                            className="form-checkbox"
                            type="checkbox"
                            checked={pinned}
                            onChange={() => setPinned(!pinned)}
                        />
                    </label>
                </div>
                <div className="form-buttons">
                    <button className="form-button-submit" type="submit">수정하기</button>
                    <button className="form-button-delete" type="button" onClick={handleDelete}>
                        삭제하기
                    </button>
                    <button className="form-button-cancel" type="button" onClick={() => navigate(`/board/${boardId}`)}>취소</button>
                </div>
            </form>
        </div>
    );
};

export default BoardEdit;
