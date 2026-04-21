
import React, { useState } from "react";
import "./Flashcard.css";
import { useNavigate } from "react-router-dom";


const Flashcard = () => {
    const [activeTab, setActiveTab] = useState("explore");
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
                            <div className="card-horizontal" onClick={() => navigate("/study/1")}>
                                <div className="card-icon">
                                    📘
                                </div>

                                <div className="card-content">
                                    <h3>Từ vựng đọc kỳ 96</h3>
                                    <p>được tạo bởi phuongmin • 25 từ vựng</p>
                                </div>
                            </div>
                            <div className="card-horizontal">
                                <div className="card-icon">
                                    📘
                                </div>

                                <div className="card-content">
                                    <h3>Vocab N TOPIK | 83th</h3>
                                    <p>được tạo bởi tôi • 64 từ vựng</p>
                                </div>
                            </div>
                            <div className="card-horizontal">
                                <div className="card-icon">
                                    📘
                                </div>

                                <div className="card-content">
                                    <h3>Vocab N TOPIK | 83th</h3>
                                    <p>được tạo bởi tôi • 64 từ vựng</p>
                                </div>
                            </div>
                            <div className="card-horizontal">
                                <div className="card-icon">
                                    📘
                                </div>

                                <div className="card-content">
                                    <h3>Vocab N TOPIK | 83th</h3>
                                    <p>được tạo bởi tôi • 64 từ vựng</p>
                                </div>
                            </div>
                            <div className="card-horizontal">
                                <div className="card-icon">
                                    📘
                                </div>

                                <div className="card-content">
                                    <h3>Vocab N TOPIK | 83th</h3>
                                    <p>được tạo bởi tôi • 25 từ vựng</p>
                                </div>
                            </div>
                            <div className="card-horizontal">
                                <div className="card-icon">
                                    📘
                                </div>

                                <div className="card-content">
                                    <h3>Vocab N TOPIK | 83th</h3>
                                    <p>được tạo bởi tôi • 64 từ vựng</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === "myWords" && (
                    <>
                        <h3 className="title-flashcard">Flashcard của tôi</h3>

                        <div className="card-grid">
                            <div className="card-horizontal">
                                <div className="card-icon">
                                    📘
                                </div>

                                <div className="card-content">
                                    <h3>Từ vựng đọc kỳ 96</h3>
                                    <p>được tạo bởi tôi • 64 từ vựng</p>
                                </div>
                            </div>
                            <div className="card-horizontal">
                                <div className="card-icon">
                                    📘
                                </div>

                                <div className="card-content">
                                    <h3>Vocab N TOPIK | 83th</h3>
                                    <p>được tạo bởi tôi • 64 từ vựng</p>
                                </div>
                            </div>
                            <div className="card-horizontal">
                                <div className="card-icon">
                                    📘
                                </div>

                                <div className="card-content">
                                    <h3>Vocab N TOPIK | 83th</h3>
                                    <p>được tạo bởi tôi • 64 từ vựng</p>
                                </div>
                            </div>
                            <div className="card-horizontal">
                                <div className="card-icon">
                                    📘
                                </div>

                                <div className="card-content">
                                    <h3>Vocab N TOPIK | 83th</h3>
                                    <p>được tạo bởi tôi • 64 từ vựng</p>
                                </div>
                            </div>
                            <div className="card-horizontal">
                                <div className="card-icon">
                                    📘
                                </div>

                                <div className="card-content">
                                    <h3>Vocab N TOPIK | 83th</h3>
                                    <p>được tạo bởi tôi • 25 từ vựng</p>
                                </div>
                            </div>
                            <div className="card-horizontal">
                                <div className="card-icon">
                                    📘
                                </div>

                                <div className="card-content">
                                    <h3>Vocab N TOPIK | 83th</h3>
                                    <p>được tạo bởi tôi • 64 từ vựng</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}


            </div>
        </div>
    );

};

export default Flashcard;
