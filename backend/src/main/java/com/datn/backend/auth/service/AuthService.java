package com.datn.backend.auth.service;

import com.datn.backend.auth.dto.LoginRequest;
import com.datn.backend.auth.dto.RegisterRequest;
import com.datn.backend.auth.entity.*;
import com.datn.backend.auth.repository.*;
import com.datn.backend.common.util.EmailUtil;
import com.datn.backend.common.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.datn.backend.common.util.OtpUtil;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final AuthAccountRepository accRepo;
    private final RefreshTokenRepository refreshRepo;
    private final EmailVerificationRepository otpRepo;

    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final OtpUtil otpUtil;
    private final EmailUtil emailUtil;
    private final PasswordResetRepository passwordResetRepo;


    // ================= REGISTER =================
    public void register(RegisterRequest req) {

        var existingUser = userRepo.findByEmail(req.getEmail());

        if (existingUser.isPresent()) {
            User user = existingUser.get();

            // chưa verify → cho gửi lại OTP
            if (!Boolean.TRUE.equals(user.getIsVerified())) {
                sendOtp(req.getEmail());
                return;
            }

            // đã verify → chặn
            throw new RuntimeException("Email already exists");
        }

        // tạo user mới
        User user = new User();
        user.setEmail(req.getEmail());
        user.setUsername(req.getUsername());
        user.setRole("USER");
        user.setIsVerified(false);

        userRepo.save(user);

        AuthAccount acc = new AuthAccount();
        acc.setUserId(user.getId());
        acc.setProvider("LOCAL");
        acc.setPassword(passwordEncoder.encode(req.getPassword()));

        accRepo.save(acc);

        sendOtp(req.getEmail());
    }

    // ================= OTP =================
    public void sendOtp(String email) {

        String otp = otpUtil.generateOtp();

        EmailVerification ev = new EmailVerification();
        ev.setEmail(email);
        ev.setOtpCode(otp);
        ev.setExpiresAt(LocalDateTime.now().plusMinutes(5));

        otpRepo.save(ev);
        emailUtil.sendOtp(email, otp);
    }

    public void verifyOtp(String email, String otp) {

        EmailVerification ev = otpRepo.findTopByEmailOrderByIdDesc(email)
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        // OTP đã dùng
        if (Boolean.TRUE.equals(ev.getIsUsed())) {
            throw new RuntimeException("OTP already used");
        }

        // OTP hết hạn
        if (ev.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        // quá số lần nhập sai
        int attempts = ev.getAttemptCount() == null ? 0 : ev.getAttemptCount();

        if (attempts >= 5)
            throw new RuntimeException("Too many attempts");


        // sai OTP
        if (!ev.getOtpCode().equals(otp)) {
            ev.setAttemptCount(ev.getAttemptCount() + 1);
            otpRepo.save(ev);
            throw new RuntimeException("Wrong OTP");
        }

        //đúng OTP → success
        ev.setIsUsed(true);
        otpRepo.save(ev);

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setIsVerified(true);
        userRepo.save(user);
    }


    // ================= LOGIN =================
    public AuthResponse login(LoginRequest req) {

        User user = userRepo.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        //chưa verify email
        if (!Boolean.TRUE.equals(user.getIsVerified())) {
            throw new RuntimeException("Email not verified");
        }

        //account bị khóa
        if (Boolean.TRUE.equals(user.getIsLocked())) {
            throw new RuntimeException("Account is locked");
        }

        AuthAccount acc = accRepo.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        // sai password
        if (!passwordEncoder.matches(req.getPassword(), acc.getPassword())) {

            int failed = user.getFailedAttempts() == null ? 0 : user.getFailedAttempts();
            failed++;

            user.setFailedAttempts(failed);

            // khóa tài khoản nếu sai quá 5 lần
            if (failed >= 5) {
                user.setIsLocked(true);
            }

            userRepo.save(user);

            throw new RuntimeException("Wrong password");
        }

        //login thành công → reset fail count
        user.setFailedAttempts(0);
        userRepo.save(user);

        //update last login
        acc.setLastLogin(LocalDateTime.now());
        accRepo.save(acc);

        // tạo token
        String accessToken = jwtUtil.generateToken(user.getId(), user.getRole());
        String refreshToken = UUID.randomUUID().toString();

        saveRefreshToken(user.getId(), refreshToken);

        return new AuthResponse(accessToken, refreshToken);
    }

    // ================= REFRESH =================
    public AuthResponse refresh(String token) {

        RefreshToken rf = refreshRepo.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (rf.getIsRevoked())
            throw new RuntimeException("Token revoked");

        if (rf.getExpiresAt().isBefore(LocalDateTime.now()))
            throw new RuntimeException("Token expired");


        rf.setIsRevoked(true);
        refreshRepo.save(rf);

        User user = userRepo.findById(rf.getUserId()).orElseThrow();

        String newAccess = jwtUtil.generateToken(user.getId(), user.getRole());
        String newRefresh = UUID.randomUUID().toString();

        saveRefreshToken(user.getId(), newRefresh);

        return new AuthResponse(newAccess, newRefresh);
    }

    // ================= LOGOUT =================
    public void logout(String token) {
        RefreshToken rf = refreshRepo.findByToken(token).orElseThrow();
        rf.setIsRevoked(true);
        refreshRepo.save(rf);
    }

    private void saveRefreshToken(Integer userId, String token) {
        RefreshToken rt = new RefreshToken();
        rt.setUserId(userId);
        rt.setToken(token);
        rt.setIsRevoked(false);

        //hạn expiresAt
        rt.setExpiresAt(LocalDateTime.now().plusDays(7)); // hoặc 30 ngày

        refreshRepo.save(rt);
    }


    // ================= Resend Otp,chống spam =================
    public void resendOtp(String email) {

        EmailVerification ev = otpRepo.findTopByEmailOrderByIdDesc(email)
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        //OTP đã dùng → không cho resend
        if (Boolean.TRUE.equals(ev.getIsUsed())) {
            throw new RuntimeException("OTP already used");
        }

        //giới hạn số lần resend
        if (ev.getResendCount() != null && ev.getResendCount() >= 3) {
            throw new RuntimeException("Resend limit reached");
        }

        // cooldown 60s
        if (ev.getLastSentAt() != null &&
                ev.getLastSentAt().plusSeconds(60).isAfter(LocalDateTime.now())) {
            throw new RuntimeException("Please wait before resend");
        }

        // tạo OTP mới
        String otp = otpUtil.generateOtp();

        ev.setOtpCode(otp);
        ev.setExpiresAt(LocalDateTime.now().plusMinutes(5));

        //reset attempt (QUAN TRỌNG)
        ev.setAttemptCount(0);

        // tăng resend count (tránh null)
        ev.setResendCount(
                ev.getResendCount() == null ? 1 : ev.getResendCount() + 1
        );

        ev.setLastSentAt(LocalDateTime.now());

        otpRepo.save(ev);

        emailUtil.sendOtp(email, otp);
    }


    // ================= forgotPassword =================
    public void forgotPassword(String email) {

        if (userRepo.findByEmail(email).isEmpty())
            throw new RuntimeException("Email not found");

        String code = otpUtil.generateOtp();

        PasswordReset pr = new PasswordReset();
        pr.setEmail(email);
        pr.setResetCode(code);
        pr.setExpiresAt(LocalDateTime.now().plusMinutes(5));

        passwordResetRepo.save(pr);
        emailUtil.sendOtp(email, code);
    }

    public void resetPassword(String email, String code, String newPassword) {

        PasswordReset pr = passwordResetRepo
                .findTopByEmailOrderByIdDesc(email)
                .orElseThrow();

        if (pr.getIsUsed()) throw new RuntimeException("Used");
        if (pr.getExpiresAt().isBefore(LocalDateTime.now()))
            throw new RuntimeException("Expired");

        if (!pr.getResetCode().equals(code))
            throw new RuntimeException("Wrong code");

        pr.setIsUsed(true);
        passwordResetRepo.save(pr);

        User user = userRepo.findByEmail(email).orElseThrow();
        AuthAccount acc = accRepo.findByUserId(user.getId()).orElseThrow();

        acc.setPassword(passwordEncoder.encode(newPassword));
        accRepo.save(acc);
    }
}
