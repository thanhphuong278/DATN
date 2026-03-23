// Các hàm gọi API thật sự
export async function fetchReviews() {
  const res = await fetch("/api/reviews");
  return res.json();
}

export async function createReview(review) {
  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  return res.json();
}

export async function updateReview(id, review) {
  const res = await fetch(`/api/reviews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  return res.json();
}

export async function deleteReview(id) {
  await fetch(`/api/reviews/${id}`, { method: "DELETE" });
}
