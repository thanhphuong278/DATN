package com.datn.backend.auth.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String username;
    private String fullName;
}
