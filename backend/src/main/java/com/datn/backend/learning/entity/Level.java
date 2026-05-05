package com.datn.backend.learning.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "levels", schema = "learning")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Level {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "level_id")
    private Integer levelId;

    @Column(name = "level_name", nullable = false, unique = true)
    private String levelName;

    @OneToMany(mappedBy = "level")
    private List<Course> courses;
}

