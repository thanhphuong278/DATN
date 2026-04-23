package com.datn.backend.auth.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.*;
import jakarta.persistence.Id;


import java.time.LocalDateTime;

@Entity
@Table(name = "email_verifications", schema = "auth")
@Getter @Setter
public class EmailVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String email;
    private String otpCode;
    private LocalDateTime expiresAt;
    private Boolean isUsed = false;

    private Integer attemptCount = 0;
    private Integer resendCount = 0;

    private LocalDateTime lastSentAt;
}

