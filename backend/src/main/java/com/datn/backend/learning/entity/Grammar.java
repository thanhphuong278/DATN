package com.datn.backend.learning.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "grammars", schema = "learning")
@Getter @Setter
public class Grammar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grammar_id")
    private Integer grammarId;

    private String title;

    @Column(name = "meaning_vi")
    private String meaningVi;

    private String usage;

    private String examples;

    private String note;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
}

