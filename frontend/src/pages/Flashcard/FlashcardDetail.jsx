import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFlashcardDetail } from "../../api/flashcardApi";
import "./FlashcardDetail.css";
import HeaderDetail from "./HeaderDetail";
import { useAuth } from "../../context/useAuth";


const FlashcardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const [data, setData] = useState(null);

    const { user } = useAuth();
    const isOwner = user?.id === data?.userId;

    useEffect(() => {
        getFlashcardDetail(id).then(res => {
            setData(res.data);
        });
    }, [id]);

    if (!data) return <p className="loading">Loading...</p>;

    return (
        <div className="detail-container">

            <HeaderDetail
                title={data.title}
                isOwner={isOwner}
                isPublic={data.isPublic}
            />

            <div className="action-bar">

                <button
                    className=""
                    onClick={() => navigate(`/study/${id}`)}
                >
                    Học Flashcard
                </button>

                <button className="secondary">
                    Trắc nghiệm
                </button>

                {isOwner && (
                    <button onClick={() => navigate(`/flashcard/edit/${id}`)}>
                        Sửa
                    </button>
                )}

                {data.isPublic && (
                    <button className="secondary">
                        Share
                    </button>
                )}

                {!data.isOwner && (
                    <button
                        onClick={async () => {
                            try {
                                await copyFlashcard(id);
                                alert("Đã lưu flashcard!");
                            } catch (err) {
                                console.error(err);
                            }
                        }}
                    >
                        Lưu
                    </button>
                )}

            </div>

            <div className="word-list">
                {data.cards.map((c, i) => (
                    <div key={i} className="word-card">
                        <div className="term">{c.term}</div>
                        <div className="meaning">{c.meaning}</div>
                        {c.example && (
                            <div className="example">{c.example}</div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default FlashcardDetail;