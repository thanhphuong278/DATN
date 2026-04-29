package com.datn.backend.flashcard.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FlashcardResponse {
    private Long id;
    private String title;
    private String description;
    private Boolean isPublic;
    private Integer totalCards;
    private Integer userId;
    private String username;

    public FlashcardResponse(Long id, String title, String description, Boolean isPublic, Integer totalCards, Integer userId, String username) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.isPublic = isPublic;
        this.totalCards = totalCards;
        this.userId = userId;
        this.username = username;
    }



}

