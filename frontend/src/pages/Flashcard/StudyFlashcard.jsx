import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFlashcardDetail } from "../../api/flashcardApi";
import "./StudyFlashcard.css";
import { saveProgress } from "../../api/flashcardApi";


const StudyFlashcard = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [words, setWords] = useState([]);
    const [title, setTitle] = useState("");

    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [knownList, setKnownList] = useState([]);

    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        getFlashcardDetail(id).then((res) => {
            const data = res.data;

                    console.log("CARDS:", data.cards); // 👈 THÊM DÒNG NÀY


            setTitle(data.title);

            const cards = data.cards.map((c) => ({
                id: c.id,
                korean: c.term,
                meaning: c.meaning,
            }));

            setWords(cards);
        });
    }, [id]);

    const current = words[index];

    const next = useCallback(() => {
        setIndex((prev) => (prev < words.length - 1 ? prev + 1 : prev));
        setFlipped(false);
    }, [words.length]);

    const prev = useCallback(() => {
        setIndex((prev) => (prev > 0 ? prev - 1 : prev));
        setFlipped(false);
    }, []);

    const shuffleWords = () => {
        const shuffled = [...words];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setWords(shuffled);
        setIndex(0);
        setFlipped(false);
    };

    const speak = () => {
        if (!current) return;
        const utterance = new SpeechSynthesisUtterance(current.korean);
        utterance.lang = "ko-KR";
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    };

    const markAnswer = async (isKnown) => {
        const card = current;

        try {
            await saveProgress(card.id, isKnown);
        } catch (err) {
            console.error("Save progress failed", err);
        }

        setKnownList((prev) => [...prev, { ...card, known: isKnown }]);

        if (index === words.length - 1) {
            setShowResult(true);
        } else {
            next();
        }
    };

    useEffect(() => {
        const handleKey = (e) => {
            if (e.code === "Space") {
                e.preventDefault();
                setFlipped((prev) => !prev);
            }
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [next, prev]);

    if (words.length === 0) {
        return <p style={{ textAlign: "center" }}>Đang tải flashcard...</p>;
    }



    const correct = knownList.filter((k) => k.known).length;
    const total = words.length;

    const progress = ((index + 1) / words.length) * 100;

    

    return (
    <div className="study-container">

        {/* HEADER */}
        <div className="top-bar">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ←
            </button>

            <h3 className="title">{title}</h3>

            <button className="shuffle-btn" onClick={shuffleWords}>
                🔀
            </button>
        </div>

        {/* PROGRESS */}
        <div className="progress-wrapper">
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <span className="progress-text">
                {index + 1}/{words.length}
            </span>
        </div>

        {/* CARD */}
        <div
            className="card-wrapper"
            onClick={() => setFlipped(!flipped)}
        >
            <div className={`card-std ${flipped ? "flipped" : ""}`}>

                {/* FRONT */}
                <div className="card-std-face front">
                    <h1>{current.korean}</h1>

                    <button
                        className="sound-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            speak();
                        }}
                    >
                        🔊
                    </button>

                    <p>Nhấn để xem nghĩa</p>
                </div>

                {/* BACK */}
                <div className="card-std-face back">
                    <h1>{current.meaning}</h1>
                    <p>Nhấn để quay lại</p>
                </div>

            </div>
        </div>

        {/* ACTION */}
        <div className="actions">
            <button
                className="wrong"
                onClick={() => markAnswer(false)}
            >
                ❌ Chưa biết
            </button>

            <button
                className="right"
                onClick={() => markAnswer(true)}
            >
                ✅ Đã biết
            </button>
        </div>

        {/* RESULT */}
        {showResult && (
            <div className="result-overlay">
                <div className="result-modal">

                    <h2>Hoàn thành 🎉</h2>

                    <p>
                        Bạn đã học <b>{correct}/{total}</b> từ
                    </p>

                    <div className="result-actions">
                        <button
                            className="retry"
                            onClick={() => {
                                setIndex(0);
                                setFlipped(false);
                                setKnownList([]);
                                setShowResult(false);
                            }}
                        >
                            Học lại
                        </button>

                        <button
                            className="exit"
                            onClick={() => navigate(-1)}
                        >
                            Thoát
                        </button>
                    </div>

                </div>
            </div>
        )}

    </div>
);

};


export default StudyFlashcard;