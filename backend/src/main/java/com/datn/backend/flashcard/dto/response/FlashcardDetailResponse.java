package com.datn.backend.flashcard.dto.response;
import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class FlashcardDetailResponse {
    private Long id;
    private String title;
    private String description;
    private Boolean isPublic;
    private Integer userId;
    private String username;

    private List<CardResponse> cards;
}