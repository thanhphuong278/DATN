package com.datn.backend.flashcard.service;

import com.datn.backend.flashcard.entity.UserCardProgress;
import com.datn.backend.flashcard.repository.UserCardProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserCardProgressService {

    private final UserCardProgressRepository repository;

    public void saveProgress(Integer userId, Long cardId, boolean known) {

        UserCardProgress progress = repository
                .findByUserIdAndCardId(userId, cardId)
                .orElseGet(() -> {
                    UserCardProgress p = new UserCardProgress();
                    p.setUserId(userId);
                    p.setCardId(cardId);
                    p.setCreatedAt(LocalDateTime.now());
                    return p;
                });

        if (known) {
            int newCount = progress.getRepetitionCount() + 1;
            progress.setRepetitionCount(newCount);

            // 🔥 spaced repetition basic
            progress.setNextReviewAt(LocalDateTime.now().plusDays(newCount));
        } else {
            progress.setRepetitionCount(0);
            progress.setNextReviewAt(LocalDateTime.now().plusMinutes(10));
        }

        progress.setUpdatedAt(LocalDateTime.now());

        repository.save(progress);
    }
}