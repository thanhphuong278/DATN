package com.datn.backend.flashcard.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "flashcard_set", schema = "flashcard")
@Data
public class FlashcardSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "is_public")
    private Boolean isPublic;

    @Column(name = "total_cards")
    private Integer totalCards;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}