package com.datn.backend.user.controller;

import com.datn.backend.user.dto.*;
import com.datn.backend.user.service.UserService;
import com.datn.backend.auth.entity.User;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class UserDataController {

    private final UserService userService;

    //Lấy user từ JWT
    private Integer getCurrentUserId() {
        User user = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return user.getId();
    }

    // ================= PROGRESS =================
    @GetMapping("/progress")
    public List<UserProgressResponse> getProgress() {
        return userService.getUserProgress(getCurrentUserId());
    }

    // ================= COURSES =================
    @GetMapping("/courses")
    public List<UserCourseResponse> getCourses() {
        return userService.getUserCourses(getCurrentUserId());
    }

    // ================= VOCAB =================
    @GetMapping("/vocab")
    public List<UserVocabResponse> getVocab() {
        return userService.getUserVocab(getCurrentUserId());
    }
}