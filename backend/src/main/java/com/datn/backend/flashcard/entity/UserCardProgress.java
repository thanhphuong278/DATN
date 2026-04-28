package com.datn.backend.flashcard.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_card_progress", schema = "flashcard",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "card_id"}))
@Getter
@Setter
public class UserCardProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer userId;

    private Long cardId;

    private Integer repetitionCount = 0;

    private LocalDateTime nextReviewAt;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}