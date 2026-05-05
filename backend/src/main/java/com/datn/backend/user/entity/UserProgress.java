package com.datn.backend.user.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "user_progress",
        schema = "user_data",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "lesson_id"})
)
@Getter @Setter
public class UserProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private com.datn.backend.learning.entity.Lesson lesson;

    private String status; // NOT_STARTED | IN_PROGRESS | COMPLETED

    private Float score = 0f;

    private Integer attempts = 0;

    @Column(name = "last_access")
    private LocalDateTime lastAccess;
}
