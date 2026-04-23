package com.datn.backend.auth.dto;

import lombok.Data;

/**
 * DTO cho verify OTP
 */
@Data
public class VerifyRequest {
    private String email;
    private String otp;
}
