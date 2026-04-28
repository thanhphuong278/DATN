package com.datn.backend.flashcard.controller;

import com.datn.backend.flashcard.service.UserCardProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class UserCardProgressController {

    private final UserCardProgressService service;

    @PostMapping
    public ResponseEntity<?> save(
            @RequestParam Long cardId,
            @RequestParam boolean known,
            @AuthenticationPrincipal(expression = "id") Integer userId
    ) {
        service.saveProgress(userId, cardId, known);
        return ResponseEntity.ok("Saved");
    }
}