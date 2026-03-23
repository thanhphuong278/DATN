import { useState, useEffect } from "react";
import { mockReviews } from "./mockReviews";
// import { fetchReviews } from "../../api/reviews";

export const useReviews = () => {
  const [reviews, setReviews] = useState(mockReviews); // gán mock trực tiếp

  useEffect(() => {
    // Sau này khi có backend:
    // fetchReviews().then(data => setReviews(data));
  }, []);

  return { reviews, setReviews };
};
