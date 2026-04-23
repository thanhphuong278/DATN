package com.datn.backend.auth.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * Entity AuthAccount ánh xạ bảng auth.auth_accounts
 */
@Entity
@Table(name = "auth_accounts", schema = "auth")
@Getter @Setter
public class AuthAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userId;
    private String provider;
    private String password;

    private LocalDateTime lastLogin;

}

