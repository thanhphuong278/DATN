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
}