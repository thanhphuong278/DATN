package com.datn.backend.exam.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "questions", schema = "assessment")
@Getter @Setter
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Integer questionId;

    @Column(name = "question_type")
    private String questionType;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(name = "correct_answer", nullable = false)
    private String correctAnswer;

    private String explanation;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;

    @ManyToOne
    @JoinColumn(name = "audio_id")
    private AudioFile audio;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuestionOption> options;
}

