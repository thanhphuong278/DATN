package com.datn.backend.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * DTO cho request đăng ký bằng email
 */
@Data
public class RegisterRequest {

    @Email
    @NotBlank
    private String email;

    @Size(min = 6)
    private String password;

    @NotBlank
    private String username;
}


