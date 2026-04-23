package com.datn.backend.auth.repository;

import com.datn.backend.auth.entity.EmailVerification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailVerificationRepository extends JpaRepository<EmailVerification, Integer> {
    Optional<EmailVerification> findTopByEmailOrderByIdDesc(String email);
}
