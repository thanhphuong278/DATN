import React, { useState } from "react";
import "./CreateFlashcard.css";
import { createFlashcard } from "../../api/flashcardApi";

const CreateFlashcard = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSave = async () => {
        try {
            const payload = {
                title,
                description,
                isPublic,
                cards: words.map((w) => ({
                    term: w.korean,
                    meaning: w.meaning,
                    example: w.example,
                })),
            };

            const res = await createFlashcard(payload);

            console.log("SUCCESS:", res.data);
            alert("Tạo flashcard thành công!");

        } catch (err) {
            console.error(err);
            alert("Lỗi khi tạo flashcard");
        }
    };


    const [words, setWords] = useState([
        { korean: "", meaning: "", example: "" }
    ]);

    const handleAddWord = () => {
        setWords([...words, { korean: "", meaning: "", example: "" }]);
    };

    const handleChange = (index, field, value) => {
        const newWords = [...words];
        newWords[index][field] = value;
        setWords(newWords);
    };

    const handleDelete = (index) => {
        const newWords = words.filter((_, i) => i !== index);
        setWords(newWords);
    };
    const [isPublic, setIsPublic] = useState(true);

    return (
        <div className="create-container">
            <div className="title-row">
                <h2>Tạo Flashcard mới</h2>

                <button
                    className={`visibility-btn ${isPublic ? "public" : "private"}`}
                    onClick={() => setIsPublic(!isPublic)}
                >
                    <span className="icon-visibility">
                        {isPublic ? "🌍" : "🔒"}
                    </span>
                    {isPublic ? "Công khai" : "Riêng tư"}
                </button>
            </div>

            <label>Tiêu đề</label>
            <input
                className="input"
                placeholder="Nhập tiêu đề flashcard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />


            {/* Description */}
            <label>Mô tả</label>
            <textarea
                className="textarea"
                placeholder="Nhập mô tả cho flashcard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            {/* Header vocab */}
            <div className="vocab-header">
                <h3>Danh sách từ vựng</h3>
                <div className="actions">
                    <button className="btn-flashcard">Import từ text</button>
                    <button className="btn-flashcard">Phân tích hình ảnh với AI</button>
                    <button className="btn-flashcard " onClick={handleAddWord}>
                        + Thêm từ vựng
                    </button>
                </div>
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
                            placeholder="Nghĩa tiếng Việt"
                            value={word.meaning}
                            onChange={(e) =>
                                handleChange(index, "meaning", e.target.value)
                            }
                        />
                        <button
                            className="delete"
                            onClick={() => handleDelete(index)}
                        >
                            🗑
                        </button>
                    </div>

                    {/* <textarea
                        placeholder="Câu ví dụ (không bắt buộc)"
                        value={word.example}
                        onChange={(e) =>
                            handleChange(index, "example", e.target.value)
                        }
                    /> */}
                </div>
            ))}

            <button className="save-btn-flashcard" onClick={handleSave}>
                Lưu Flashcard
            </button>
        </div>
    );
};

export default CreateFlashcard;