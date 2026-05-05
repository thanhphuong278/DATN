package com.datn.backend.user.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_courses", schema = "user_data")
@Getter @Setter
public class UserCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private com.datn.backend.learning.entity.Course course;

    @Column(name = "enrolled_at")
    private LocalDateTime enrolledAt;
}
