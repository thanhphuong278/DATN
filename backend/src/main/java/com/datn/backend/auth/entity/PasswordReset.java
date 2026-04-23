package com.datn.backend.auth.entity;

import lombok.*;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;


import java.time.LocalDateTime;

@Entity
@Table(name = "password_resets", schema = "auth")
@Getter @Setter
public class PasswordReset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String email;
    private String resetCode;

    private LocalDateTime expiresAt;
    private Boolean isUsed = false;

    private Integer attemptCount = 0;
}

