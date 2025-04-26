import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/BoardPage.css";

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/boards")
      .then((response) => {
        const recentBoards = response.data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5);
        setBoards(recentBoards);
        setLoading(false);
      })
      .catch((error) => {
        console.error("게시판 목록 가져오기 실패:", error);
        setLoading(false);
      });
  }, []);

  const handleBoardClick = (boardId) => {
    navigate(`/board/${boardId}`);
  };

  if (loading) {
    return <div className="board-page-loading">게시판을 불러오는 중...</div>;
  }

  return (
    <div className="recent-boards">
      <h1 className="recent-boards-header">공지사항</h1>

      <table className="boards-table">
        <thead>
          <tr>
            <th>작성일</th>
            <th>제목</th>
            <th>작성자</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {boards.length === 0 ? (
            <tr>
              <td colSpan="4">최근 게시글이 없습니다.</td>
            </tr>
          ) : (
            boards.map((board) => (
              <tr key={board.id} onClick={() => handleBoardClick(board.id)}>
                <td>{new Date(board.created_at).toLocaleDateString()}</td>
                <td>{board.title}</td>
                <td>{board.author}</td>
                <td>{board.views}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Boards;
