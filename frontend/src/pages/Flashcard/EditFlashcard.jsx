import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFlashcardDetail, updateFlashcard } from "../../api/flashcardApi";
import "./CreateFlashcard.css";

const EditFlashcard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [words, setWords] = useState([]);

  useEffect(() => {
    getFlashcardDetail(id).then((res) => {
      const data = res.data;

      setTitle(data.title);
      setDescription(data.description);
      setIsPublic(data.isPublic);

      setWords(
        data.cards.map((c) => ({
          id: c.id,
          korean: c.term,
          meaning: c.meaning,
          example: c.example,
        }))
      );
    });
  }, [id]);

  const handleAddWord = () => {
    setWords([...words, { korean: "", meaning: "", example: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newWords = [...words];
    newWords[index][field] = value;
    setWords(newWords);
  };

  const handleDelete = (index) => {
    setWords(words.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      const payload = {
        title,
        description,
        isPublic,
        cards: words.map((w) => ({
          id: w.id, 
          term: w.korean,
          meaning: w.meaning,
          example: w.example,
        })),
      };

      await updateFlashcard(id, payload);

      alert("Cập nhật thành công!");
      navigate(`/flashcard/${id}`);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi cập nhật");
    }
  };

  return (
    <div className="create-container">
      <div className="title-row">
        <h2>Chỉnh sửa Flashcard</h2>

        <button
          className={`visibility-btn ${isPublic ? "public" : "private"}`}
          onClick={() => setIsPublic(!isPublic)}
        >
          {isPublic ? "🌍 Công khai" : "🔒 Riêng tư"}
        </button>
      </div>

      <label>Tiêu đề</label>
      <input
        className="input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Mô tả</label>
      <textarea
        className="textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="vocab-header">
        <h3>Danh sách từ vựng</h3>

        <button onClick={handleAddWord}>
          + Thêm từ
        </button>
      </div>

      {words.map((word, index) => (
        <div className="word-card" key={index}>
          <div className="row">
            <input
              placeholder="Từ tiếng Hàn"
              value={word.korean}
              onChange={(e) =>
                handleChange(index, "korean", e.target.value)
              }
            />

            <input
              placeholder="Nghĩa"
              value={word.meaning}
              onChange={(e) =>
                handleChange(index, "meaning", e.target.value)
              }
            />

            <button onClick={() => handleDelete(index)}>
              🗑
            </button>
          </div>
        </div>
      ))}

      <button className="save-btn-flashcard" onClick={handleSave}>
        Lưu thay đổi
      </button>
    </div>
  );
};

export default EditFlashcard;