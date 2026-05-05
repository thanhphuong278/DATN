package com.datn.backend.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class UserVocabResponse {

    private Integer vocabId;
    private Boolean isFavorite;
    private Boolean isKnown;
    private LocalDateTime lastReview;
}
