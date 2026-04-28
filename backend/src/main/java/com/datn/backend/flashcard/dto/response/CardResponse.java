package com.datn.backend.flashcard.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CardResponse {
    private Long id;
    private String term;
    private String meaning;
    private String example;
    private String imageUrl;
}
