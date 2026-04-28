package com.datn.backend.flashcard.repository;

import com.datn.backend.flashcard.dto.response.FlashcardResponse;
import com.datn.backend.flashcard.entity.FlashcardSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlashcardSetRepository extends JpaRepository<FlashcardSet, Long> {

    @Query("""
    SELECT new com.datn.backend.flashcard.dto.response.FlashcardResponse(
        f.id,
        f.title,
        f.description,
        f.isPublic,
        f.totalCards,
        f.userId,
        u.username
    )
    FROM FlashcardSet f
    JOIN User u ON f.userId = u.id
    WHERE f.userId = :userId
    """)
    List<FlashcardResponse> findMyFlashcards(@Param("userId") Integer userId);

    @Query("""
    SELECT new com.datn.backend.flashcard.dto.response.FlashcardResponse(
        f.id,
        f.title,
        f.description,
        f.isPublic,
        f.totalCards,
        f.userId,
        u.username
    )
    FROM FlashcardSet f
    JOIN User u ON f.userId = u.id
    WHERE f.isPublic = true
    ORDER BY f.createdAt DESC
    """)
    List<FlashcardResponse> findExploreFlashcards();

    List<FlashcardSet> findByUserId(Integer userId);

    List<FlashcardSet> findByIsPublicTrueOrderByCreatedAtDesc();
}

