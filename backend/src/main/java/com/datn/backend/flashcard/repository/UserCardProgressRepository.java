package com.datn.backend.flashcard.repository;

import com.datn.backend.flashcard.entity.UserCardProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface UserCardProgressRepository extends JpaRepository<UserCardProgress, Long> {

    Optional<UserCardProgress> findByUserIdAndCardId(Integer userId, Long cardId);}