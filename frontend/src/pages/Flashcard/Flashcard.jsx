
import React, { useEffect, useState } from "react";
import { getMyFlashcards, exploreFlashcards } from "../../api/flashcardApi";
import "./Flashcard.css";
import { useNavigate } from "react-router-dom";


const Flashcard = () => {
    const [activeTab, setActiveTab] = useState("explore");

    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res;

                if (activeTab === "explore") {
                    res = await exploreFlashcards();
                } else {
                    res = await getMyFlashcards();
                }

                console.log("API DATA:", res.data);

                setFlashcards(res.data.data || res.data.content || res.data || []);
            } catch (err) {
                console.error("ERROR:", err);
            }
        };

        fetchData();
    }, [activeTab]);

    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();



    const myWords = [
        { korean: "사랑", meaning: "Tình yêu" },
        { korean: "학교", meaning: "Trường học" },
        { korean: "친구", meaning: "Bạn bè" },
    ];

    return (
        <div className="flashcard-container">
            <div className="hero">
                <div className="hero-left">
                    <button
                        className={activeTab === "myWords" ? "active" : ""}
                        onClick={() => setActiveTab("myWords")}
                    >
                        Flashcard của tôi
                    </button>

                    <button
                        className={activeTab === "explore" ? "active" : ""}
                        onClick={() => setActiveTab("explore")}
                    >
                        Khám phá
                    </button>
                </div>

                <div className="hero-right">
                    <button
                        className="create-flashcard"
                        onClick={() => navigate("/flashcard/create-flashcard")}
                    >
                        Tạo flashcard mới
                    </button>
                </div>
            </div>

            <div className="content">
                {activeTab === "explore" && (
                    <>
                        <h3 className="title-flashcard">Khám phá chủ đề từ vựng</h3>

                        <div className="card-grid">
                            {Array.isArray(flashcards) && flashcards.map((fc) => (
                                <div
                                    className="card-horizontal"
                                    key={fc.id}
                                    onClick={() => navigate(`/study/${fc.id}`)}
                                >
                                    <div className="card-icon">📘</div>

                                    <div className="card-content">
                                        <h3>{fc.title || "No title"}</h3>
                                        <p>
                                            {fc.userId === 1 ? "tôi" : "user"} • {fc.totalCards || 0} từ vựng
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === "myWords" && (
                    <>
                        <h3 className="title-flashcard">Flashcard của tôi</h3>

                        <div className="card-grid">
                            {Array.isArray(flashcards) && flashcards.map((fc) => (
                                <div
                                    className="card-horizontal"
                                    key={fc.id}
                                    onClick={() => navigate(`/study/${fc.id}`)}
                                >
                                    <div className="card-icon">📘</div>

                                    <div className="card-content">
                                        <h3>{fc.title || "No title"}</h3>
                                        <p>
                                            {fc.userId === 1 ? "tôi" : "user"} • {fc.totalCards || 0} từ vựng
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}


            </div>
        </div>
    );

};

export default Flashcard;
