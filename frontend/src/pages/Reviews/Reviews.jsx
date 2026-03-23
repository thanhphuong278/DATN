import React, { useState } from "react";
import "./Reviews.css";
import { serviceOptions } from "./serviceOptions";
import { useReviews } from "./useReviews";

const Reviews = () => {
  const currentUser = "Tên tài khoản (demo)";
  const { reviews, setReviews } = useReviews();

  const [newReview, setNewReview] = useState({
    id: null,
    user: currentUser,
    rating: 0,
    comment: "",
    services: [],
    media: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [filterRating, setFilterRating] = useState(0);

  // Upload nhiều file
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const mediaFiles = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));
    setNewReview({ ...newReview, media: [...newReview.media, ...mediaFiles] });
  };

  // Chọn dịch vụ
  const toggleService = (service) => {
    if (newReview.services.includes(service)) {
      setNewReview({
        ...newReview,
        services: newReview.services.filter((s) => s !== service),
      });
    } else {
      setNewReview({
        ...newReview,
        services: [...newReview.services, service],
      });
    }
  };

  // Xóa dịch vụ đã chọn
  const removeService = (service) => {
    setNewReview({
      ...newReview,
      services: newReview.services.filter((s) => s !== service),
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newReview.rating > 0 &&
      newReview.comment &&
      newReview.services.length > 0
    ) {
      if (isEditing) {
        setReviews(reviews.map((r) => (r.id === newReview.id ? newReview : r)));
        setIsEditing(false);
      } else {
        setReviews([{ ...newReview, id: Date.now() }, ...reviews]);
      }
      setNewReview({
        id: null,
        user: currentUser,
        rating: 0,
        comment: "",
        services: [],
        media: [],
      });
    }
  };

  // Chỉnh sửa đánh giá (chỉ cho chính user)
  const handleEdit = (review) => {
    if (review.user === currentUser) {
      setNewReview(review);
      setIsEditing(true);
    }
  };

  // Xóa đánh giá (chỉ cho chính user)
  const handleDelete = (id, user) => {
    if (user === currentUser) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  // Lọc ra đánh giá của chính user
  const myReviews = reviews.filter((r) => r.user === currentUser);

  // Lọc theo số sao cho panel phải
  const filteredReviews =
    filterRating === 0
      ? reviews
      : reviews.filter((r) => r.rating === filterRating);

  return (
    <div className="reviews-container">
      <div className="reviews-split">
        {/* Bên trái: người dùng hiện tại */}
        <div className="left-panel">
          <h2>Đánh giá của bạn</h2>
          <form className="review-form" onSubmit={handleSubmit}>
            <select
              value={newReview.rating}
              onChange={(e) =>
                setNewReview({ ...newReview, rating: parseInt(e.target.value) })
              }
            >
              <option value="0">Chọn số sao</option>
              <option value="1">⭐</option>
              <option value="2">⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="5">⭐⭐⭐⭐⭐</option>
            </select>

            <textarea
              placeholder="Viết cảm nhận của bạn..."
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
            />

            {/* Chọn dịch vụ */}
            <div className="service-options">
              {serviceOptions.map((service) => (
                <button
                  type="button"
                  key={service}
                  className={
                    newReview.services.includes(service)
                      ? "service-btn active"
                      : "service-btn"
                  }
                  onClick={() => toggleService(service)}
                >
                  {service}
                </button>
              ))}
            </div>

            {/* Hiển thị dịch vụ đã chọn */}
            <div className="selected-services">
              {newReview.services.map((service) => (
                <span key={service} className="selected-service">
                  {service}{" "}
                  <button onClick={() => removeService(service)}>✖</button>
                </span>
              ))}
            </div>

            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileUpload}
            />

            <button type="submit">
              {isEditing ? "Cập nhật đánh giá" : "Gửi đánh giá"}
            </button>
          </form>

          {/* Hiển thị đánh giá của chính user */}
          <div className="reviews-list">
            {myReviews.map((review) => (
              <div key={review.id} className="review-card">
                <h3>{review.user}</h3>
                <p className="stars">{"⭐".repeat(review.rating)}</p>
                <p>{review.comment}</p>
                <p className="services">
                  Dịch vụ: {review.services.join(", ")}
                </p>

                {review.media.map((m, i) =>
                  m.type === "image" ? (
                    <img
                      key={i}
                      src={m.url}
                      alt="review"
                      className="review-media"
                    />
                  ) : (
                    <video key={i} controls className="review-media">
                      <source src={m.url} type="video/mp4" />
                    </video>
                  ),
                )}

                <div className="review-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(review)}
                  >
                    Sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(review.id, review.user)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bên phải: tất cả đánh giá */}
        <div className="right-panel">
          <h2>Tất cả đánh giá</h2>

          {/* Bộ lọc theo số sao */}
          <div className="filter-section">
            <span>Lọc theo số sao: </span>
            <button onClick={() => setFilterRating(0)}>Tất cả</button>
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => setFilterRating(star)}>
                {"⭐".repeat(star)}
              </button>
            ))}
          </div>

          <div className="reviews-list">
            {filteredReviews.map((review) => (
              <div key={review.id} className="review-card">
                <h3>{review.user}</h3>
                <p className="stars">{"⭐".repeat(review.rating)}</p>
                <p>{review.comment}</p>
                <p className="services">
                  Dịch vụ: {review.services.join(", ")}
                </p>

                {review.media.map((m, i) =>
                  m.type === "image" ? (
                    <img
                      key={i}
                      src={m.url}
                      alt="review"
                      className="review-media"
                    />
                  ) : (
                    <video key={i} controls className="review-media">
                      <source src={m.url} type="video/mp4" />
                    </video>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
