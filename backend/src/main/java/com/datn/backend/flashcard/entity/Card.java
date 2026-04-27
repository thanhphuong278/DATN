package com.datn.backend.flashcard.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "card", schema = "flashcard")
@Data
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "flashcard_set_id")
    private Long flashcardSetId;

    private String term;
    private String meaning;
    private String example;

    @Column(name = "image_url")
    private String imageUrl;
}