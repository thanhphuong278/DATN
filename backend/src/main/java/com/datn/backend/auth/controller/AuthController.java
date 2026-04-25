package com.datn.backend.auth.controller;

import com.datn.backend.auth.dto.*;
import com.datn.backend.auth.entity.AuthResponse;
import com.datn.backend.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.datn.backend.common.util.JwtUtil;
import com.datn.backend.auth.repository.UserRepository;
import com.datn.backend.auth.entity.User;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepo;

    @GetMapping("/me")
    public User getCurrentUser(@RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        Integer userId = Integer.parseInt(jwtUtil.parseToken(token).getSubject());

        return userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


    // ================= REGISTER =================
    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest req) {
        authService.register(req);
        return "Check email OTP";
    }

    // ================= VERIFY OTP =================
    @PostMapping("/verify")
    public String verify(@RequestBody VerifyRequest req) {
        authService.verifyOtp(req.getEmail(), req.getOtp());
        return "Verified";
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest req) {
        return authService.login(req);
    }

    // ================= REFRESH =================
    @PostMapping("/refresh")
    public AuthResponse refresh(@RequestBody RefreshRequest req) {
        return authService.refresh(req.getRefreshToken());
    }

    // ================= LOGOUT =================
    @PostMapping("/logout")
    public String logout(@RequestParam String token) {
        authService.logout(token);
        return "Logged out";
    }

    // ================= RESEND OTP =================
    @PostMapping("/resend-otp")
    public String resendOtp(@RequestParam String email) {
        authService.resendOtp(email);
        return "OTP resent";
    }

    // ================= FORGOT PASSWORD =================
    @PostMapping("/forgot-password")
    public String forgot(@RequestParam String email) {
        authService.forgotPassword(email);
        return "Check email";
    }

    // ================= RESET PASSWORD =================
    @PostMapping("/reset-password")
    public String reset(@RequestParam String email,
                        @RequestParam String code,
                        @RequestParam String newPassword) {
        authService.resetPassword(email, code, newPassword);
        return "Password updated";
    }
}
