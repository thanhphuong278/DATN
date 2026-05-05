package com.datn.backend.auth.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
}
