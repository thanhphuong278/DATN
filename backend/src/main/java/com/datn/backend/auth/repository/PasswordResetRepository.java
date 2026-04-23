package com.datn.backend.auth.repository;

import com.datn.backend.auth.entity.PasswordReset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetRepository extends JpaRepository<PasswordReset, Integer> {

    Optional<PasswordReset> findTopByEmailOrderByIdDesc(String email);
}

