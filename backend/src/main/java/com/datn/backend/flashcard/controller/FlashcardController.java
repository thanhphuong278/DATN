package com.datn.backend.flashcard.controller;

import com.datn.backend.flashcard.dto.request.CreateFlashcardRequest;
import com.datn.backend.flashcard.dto.request.UpdateFlashcardRequest;
import com.datn.backend.flashcard.service.FlashcardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.datn.backend.auth.entity.User;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/flashcards")
@RequiredArgsConstructor
public class FlashcardController {

    private final FlashcardService flashcardService;

    @PostMapping
    public ResponseEntity<?> create(
            @RequestBody CreateFlashcardRequest request,
            Authentication authentication
    ) {
        Integer userId = getUserId(authentication);
        return ResponseEntity.ok(
                flashcardService.createFlashcard(request, userId)
        );
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMy(Authentication authentication) {
        Integer userId = getUserId(authentication);
        return ResponseEntity.ok(
                flashcardService.getMyFlashcards(userId)
        );
    }

    @GetMapping("/explore")
    public ResponseEntity<?> explore() {
        return ResponseEntity.ok(
                flashcardService.exploreFlashcards()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDetail(@PathVariable Long id) {
        return ResponseEntity.ok(
                flashcardService.getFlashcardDetail(id)
        );
    }

    @PostMapping("/{id}/copy")
    public ResponseEntity<?> copyFlashcard(
            @PathVariable Long id,
            @AuthenticationPrincipal(expression = "id") Integer userId
    ) {
        return ResponseEntity.ok(
                flashcardService.copyFlashcard(id, userId)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFlashcard(
            @PathVariable Long id,
            @RequestBody UpdateFlashcardRequest request,
            @AuthenticationPrincipal(expression = "id") Integer userId
    ) {
        return ResponseEntity.ok(
                flashcardService.updateFlashcard(id, request, userId)
        );
    }

    private Integer getUserId(Authentication authentication) {
        if (authentication == null || authentication.getPrincipal() == null) {
            throw new RuntimeException("Chưa đăng nhập");
        }

        Object principal = authentication.getPrincipal();

        if (principal instanceof User user) {
            return user.getId();
        }

        throw new RuntimeException("Principal không hợp lệ: " + principal.getClass());
    }
}