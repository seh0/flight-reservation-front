import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../style/BoardDetail.css";

const BoardDetail = () => {
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const { boardId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    const fetchBoard = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/boards/${boardId}`);
        const currentBoard = response.data;

        await axios.put(`http://localhost:5000/boards/${boardId}`, {
          ...currentBoard,
          views: currentBoard.views + 1,
        });

        setBoard({
          ...currentBoard,
          views: currentBoard.views + 1,
        });
        setLoading(false);
      } catch (error) {
        console.error("게시판 가져오기 실패:", error);
        setLoading(false);
      }
    };

    fetchBoard();
  }, [boardId]);

  if (loading) {
    return <div className="board-detail-loading">게시판을 불러오는 중...</div>;
  }

  if (!board) {
    return <div>게시판을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="board-detail-page">
      <h1 className="board-detail-title">{board.title}</h1>
      <p className="board-detail-author">
        <strong>작성자:</strong> {board.author}
      </p>
      <p className="board-detail-date">
        <strong>작성일:</strong> {new Date(board.created_at).toLocaleString()}
      </p>
      <p className="board-detail-views">
        <strong>조회수:</strong> {board.views}
      </p>
      <div className="board-detail-content">
        <strong>내용:</strong>
        <p>{board.content}</p>
      </div>
      <button onClick={() => navigate("/board")}>목록으로</button>
    </div>
  );
};

export default BoardDetail;
