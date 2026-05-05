package com.datn.backend.exam.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "exam_results", schema = "assessment")
@Getter @Setter
public class ExamResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_id")
    private Integer resultId;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    private Float score;

    @Column(name = "taken_at")
    private LocalDateTime takenAt;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;
}

