package com.datn.backend.auth.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Entity User ánh xạ bảng auth.users
 */
@Entity
@Table(name = "users", schema = "auth")
@Getter @Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String email;
    private String username;
    @Column(name = "full_name")
    private String fullName;

    private Boolean isVerified = false;
    private Boolean isActive = true;

    private String role;

    private Integer failedAttempts = 0;
    private Boolean isLocked = false;

}
