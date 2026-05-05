package com.datn.backend.learning.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "lessons", schema = "learning")
@Getter @Setter
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lesson_id")
    private Integer lessonId;

    @Column(nullable = false)
    private String title;

    @Column(name = "order_index")
    private Integer orderIndex;

    @Column(name = "is_locked")
    private Boolean isLocked; //thêm vì DB có

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @OneToMany(mappedBy = "lesson")
    private List<Vocabulary> vocabularies;

    @OneToMany(mappedBy = "lesson")
    private List<Grammar> grammars;
}
