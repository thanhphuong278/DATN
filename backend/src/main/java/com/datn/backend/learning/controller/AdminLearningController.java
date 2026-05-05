package com.datn.backend.learning.controller;

import com.datn.backend.learning.entity.Course;
import com.datn.backend.learning.entity.Lesson;
import com.datn.backend.learning.entity.Level;
import com.datn.backend.learning.repository.CourseRepository;
import com.datn.backend.learning.repository.LessonRepository;
import com.datn.backend.learning.repository.LevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/admin/learning")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminLearningController {

    private final CourseRepository courseRepo;
    private final LessonRepository lessonRepo;
    private final LevelRepository levelRepo;

    // ===== LEVEL =====
    @PostMapping("/levels")
    public Level createLevel(@RequestBody Level level) {

        if (level.getLevelName() == null || level.getLevelName().isBlank()) {
            throw new RuntimeException("Level name is required");
        }

        return levelRepo.save(level);
    }

    // ===== COURSE =====
    @PostMapping("/courses")
    public Course createCourse(@RequestBody Course c) {

        if (c.getCourseName() == null || c.getCourseName().isBlank()) {
            throw new RuntimeException("Course name is required");
        }

        if (c.getLevel() == null || c.getLevel().getLevelId() == null) {
            throw new RuntimeException("Level is required");
        }

        Level level = levelRepo.findById(c.getLevel().getLevelId())
                .orElseThrow(() -> new RuntimeException("Level not found"));

        c.setLevel(level);
        c.setCreatedAt(java.time.LocalDateTime.now());

        return courseRepo.save(c);
    }

    @PutMapping("/courses/{id}")
    public Course updateCourse(@PathVariable Integer id, @RequestBody Course c) {

        Course existing = courseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        existing.setCourseName(c.getCourseName());
        existing.setDescription(c.getDescription());

        return courseRepo.save(existing);
    }

    @DeleteMapping("/courses/{id}")
    public void deleteCourse(@PathVariable Integer id) {
        courseRepo.deleteById(id);
    }

    // ===== LESSON =====
    @PostMapping("/lessons")
    public Lesson createLesson(@RequestBody Lesson l) {

        if (l.getTitle() == null || l.getTitle().isBlank()) {
            throw new RuntimeException("Lesson title is required");
        }

        if (l.getCourse() == null || l.getCourse().getCourseId() == null) {
            throw new RuntimeException("Course is required");
        }

        Course course = courseRepo.findById(l.getCourse().getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        l.setCourse(course);
        l.setIsLocked(false);

        return lessonRepo.save(l);
    }

    @PutMapping("/lessons/{id}")
    public Lesson updateLesson(@PathVariable Integer id, @RequestBody Lesson l) {

        Lesson existing = lessonRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        existing.setTitle(l.getTitle());
        existing.setOrderIndex(l.getOrderIndex());

        return lessonRepo.save(existing);
    }

    @DeleteMapping("/lessons/{id}")
    public void deleteLesson(@PathVariable Integer id) {
        lessonRepo.deleteById(id);
    }
}