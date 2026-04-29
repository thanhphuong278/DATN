package com.datn.backend.flashcard.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class UpdateFlashcardRequest {
    private String title;
    private String description;
    private Boolean isPublic;
    private List<CardRequest> cards;

    @Data
    public static class CardRequest {
        private Long id;
        private String term;
        private String meaning;
        private String example;
        private String imageUrl;
    }
}