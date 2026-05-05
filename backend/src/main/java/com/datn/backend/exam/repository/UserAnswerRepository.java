package com.datn.backend.exam.repository;
import com.datn.backend.exam.entity.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAnswerRepository extends JpaRepository<UserAnswer, Integer> {}
