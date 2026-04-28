import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFlashcardDetail } from "../../api/flashcardApi";

const FlashcardDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);

    useEffect(() => {
        getFlashcardDetail(id).then(res => {
            setData(res.data);
        });
    }, [id]);

    if (!data) return <p>Loading...</p>;

    return (
        <div className="flashcard-detail">

            <h2>{data.title}</h2>
            <p>{data.description}</p>

            \      <div className="actions">
                <button onClick={() => navigate(`/study/${id}`)}>
                    Học Flashcard
                </button>

                <button>Test</button>

                {data.isPublic && <button>Share</button>}
            </div>

\            <div className="card-list">
                {data.cards.map((c, index) => (
                    <div key={index} className="card-item">
                        <h4>{c.term}</h4>
                        <p>{c.meaning}</p>
                        {c.example && <small>{c.example}</small>}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default FlashcardDetail;