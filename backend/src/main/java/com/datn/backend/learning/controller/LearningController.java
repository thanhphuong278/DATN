package com.datn.backend.learning.controller;

import com.datn.backend.learning.service.LearningService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

import com.datn.backend.learning.dto.response.*;
import com.datn.backend.auth.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/learning")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class LearningController {

    private final LearningService service;

    // ================= LEVEL =================
    @GetMapping("/levels")
    public List<LevelResponse> getLevels() {
        return service.getLevels();
    }

    // ================= COURSE =================
    @GetMapping("/courses")
    public List<CourseResponse> getCourses(@RequestParam Integer levelId) {
        return service.getCourses(levelId);
    }

    // ================= LESSON LIST =================
    @GetMapping("/lessons")
    public List<LessonSimpleResponse> getLessons(@RequestParam Integer courseId) {

        User user = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return service.getLessons(courseId, user.getId());
    }

    // ================= LESSON DETAIL =================
    @GetMapping("/lesson/{id}")
    public LessonDetailResponse getLesson(@PathVariable Integer id) {
        return service.getLessonDetail(id);
    }

    // ================= COMPLETE LESSON =================
    @PostMapping("/lesson/{id}/progress")
    public void completeLesson(@PathVariable Integer id) {

        User user = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        service.completeLesson(user.getId(), id);
    }
}