package com.datn.backend.learning.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vocabularies", schema = "learning")
@Getter @Setter
public class Vocabulary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vocab_id")
    private Integer vocabId;

    @Column(name = "word_kr", nullable = false)
    private String wordKr;

    @Column(name = "meaning_vi")
    private String meaningVi;

    private String pronunciation;

    @Column(name = "audio_url")
    private String audioUrl;

    private String example;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
}

