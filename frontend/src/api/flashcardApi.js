import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8081/api",
});

API.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");

  console.log("FLASHCARD TOKEN:", token);

  if (token && token !== "null" && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const createFlashcard = (data) => API.post("/flashcards", data);
export const getMyFlashcards = () => API.get("/flashcards/my");
export const exploreFlashcards = () => API.get("/flashcards/explore");
export const getFlashcardDetail = (id) =>
    API.get(`/flashcards/${id}`); 

export const saveProgress = (cardId, known) =>
  API.post(`/progress?cardId=${cardId}&known=${known}`);

export const copyFlashcard = (id) => 
    API.post(`/flashcards/${id}/copy`);

export const updateFlashcard = (id, data) => 
    API.put(`/flashcards/${id}`, data);