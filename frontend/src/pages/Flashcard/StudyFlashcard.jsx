import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./StudyFlashcard.css";

const StudyFlashcard = () => {
    const navigate = useNavigate();

    const flashcardTitle = "Cơ bản";

    const [words, setWords] = useState([
        { korean: "안녕하세요", meaning: "Xin chào" },
        { korean: "사랑", meaning: "Tình yêu" },
        { korean: "학교", meaning: "Trường học" },
    ]);

    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [knownList, setKnownList] = useState([]);

    const current = words[index];

    // NEXT
    const next = useCallback(() => {
        setIndex((prev) => (prev < words.length - 1 ? prev + 1 : prev));
        setFlipped(false);
    }, [words.length]);

    // PREV
    const prev = useCallback(() => {
        setIndex((prev) => (prev > 0 ? prev - 1 : prev));
        setFlipped(false);
    }, []);

    // SHUFFLE
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

    // SPEAK
    const speak = () => {
        const utterance = new SpeechSynthesisUtterance(current.korean);
        utterance.lang = "ko-KR";
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    };

    // MARK
    const markAnswer = (isKnown) => {
        setKnownList((prev) => [...prev, { ...current, known: isKnown }]);
        next();
    };

    // KEYBOARD
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

    const progress = ((index + 1) / words.length) * 100;

    return (
        <div className="study-container">

            {/* HEADER */}
            <div className="top-bar">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ←
                </button>

                <h3 className="title">{flashcardTitle}</h3>

                <div className="top-actions">
                    <button onClick={shuffleWords}>🔀</button>
                </div>
            </div>

            {/* PROGRESS */}
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* CARD */}
            <div
                className="card-wrapper"
                onClick={() => setFlipped(!flipped)}
            >
                <div className={`card ${flipped ? "flipped" : ""}`}>

                    {/* FRONT */}
                    <div className="card-face front">
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
                    <div className="card-face back">
                        <h1>{current.meaning}</h1>
                        <p>Nhấn để quay lại</p>
                    </div>

                </div>
            </div>

            {/* NAV */}
            <div className="nav">
                <button onClick={prev}>←</button>
                <span>{index + 1} / {words.length}</span>
                <button onClick={next}>→</button>
            </div>

            {/* ACTION */}
            <div className="actions">
                <button
                    className="wrong"
                    onClick={() => markAnswer(false)}
                >
                    Chưa biết
                </button>

                <button
                    className="right"
                    onClick={() => markAnswer(true)}
                >
                    Đã biết
                </button>
            </div>

            {/* HINT */}
            <div className="hint">
                Space: lật • ← →: chuyển
            </div>

        </div>
    );
};

export default StudyFlashcard;