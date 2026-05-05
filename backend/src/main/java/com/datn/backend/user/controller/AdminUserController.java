package com.datn.backend.user.controller;

import com.datn.backend.user.entity.UserProgress;
import com.datn.backend.user.repository.UserProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import com.datn.backend.user.dto.*;
import com.datn.backend.user.service.UserService;
import com.datn.backend.auth.entity.User;
import com.datn.backend.auth.repository.UserRepository;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private final UserService userService;
    private final UserRepository userRepo;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @GetMapping("/{userId}/progress")
    public List<UserProgressResponse> getUserProgress(@PathVariable Integer userId) {
        return userService.getUserProgress(userId);
    }

    @PutMapping("/{userId}/lock")
    public String lockUser(@PathVariable Integer userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setIsLocked(true);
        userRepo.save(user);

        return "User locked";
    }

    @PutMapping("/{userId}/unlock")
    public String unlockUser(@PathVariable Integer userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setIsLocked(false);
        userRepo.save(user);

        return "User unlocked";
    }
}