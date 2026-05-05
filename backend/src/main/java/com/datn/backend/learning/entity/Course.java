package com.datn.backend.learning.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "courses", schema = "learning")
@Getter @Setter
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Integer courseId;

    @Column(name = "course_name", nullable = false)
    private String courseName;

    private String description;

    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "level_id")
    private Level level;

    @OneToMany(mappedBy = "course")
    private List<Lesson> lessons;
}

