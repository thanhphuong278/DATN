package com.datn.backend.auth.repository;

import com.datn.backend.auth.entity.AuthAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthAccountRepository extends JpaRepository<AuthAccount, Integer> {
    Optional<AuthAccount> findByUserIdAndProvider(Integer userId, String provider);
}

