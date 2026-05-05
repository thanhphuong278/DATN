package com.datn.backend.exam.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "exams", schema = "assessment")
@Getter @Setter
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exam_id")
    private Integer examId;

    @Column(name = "exam_type")
    private String examType;

    @Column(name = "topik_type")
    private String topikType;

    private String title;

    @Column(name = "time_limit")
    private Integer timeLimit;

    @Column(name = "source_type")
    private String sourceType;

    @Column(name = "source_url")
    private String sourceUrl;

    @Column(name = "sheet_name")
    private String sheetName;

    @Column(name = "is_synced")
    private Boolean isSynced;

    @Column(name = "last_synced_at")
    private LocalDateTime lastSyncedAt;

    @Column(name = "sync_status")
    private String syncStatus;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "lesson_id")
    private Integer lessonId;

    @ManyToOne
    @JoinColumn(name = "audio_id")
    private AudioFile audio;

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions;
}
