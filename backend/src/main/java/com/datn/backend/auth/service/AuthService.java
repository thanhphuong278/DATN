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
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final AuthAccountRepository accRepo;
    private final RefreshTokenRepository refreshRepo;
    private final EmailVerificationRepository otpRepo;
    private final PasswordResetRepository passwordResetRepo;

    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final OtpUtil otpUtil;
    private final EmailUtil emailUtil;

    // ================= REGISTER =================
    public void register(RegisterRequest req) {

        String email = req.getEmail().trim().toLowerCase();

        var existingUser = userRepo.findByEmailIgnoreCase(email);

        if (existingUser.isPresent()) {
            User user = existingUser.get();

            boolean hasLocal = accRepo
                    .findByUserIdAndProvider(user.getId(), "LOCAL")
                    .isPresent();

            if (hasLocal) {
                throw new RuntimeException("Email already registered");
            }

            AuthAccount acc = new AuthAccount();
            acc.setUserId(user.getId());
            acc.setProvider("LOCAL");
            acc.setPassword(passwordEncoder.encode(req.getPassword()));
            accRepo.save(acc);

            sendOtp(email);
            return;
        }

        User user = new User();
        user.setEmail(email);
        user.setUsername(req.getUsername());
        user.setRole("USER");
        user.setIsVerified(false);
        user.setIsActive(true);
        user.setIsLocked(false);
        user.setFailedAttempts(0);

        userRepo.save(user);

        AuthAccount acc = new AuthAccount();
        acc.setUserId(user.getId());
        acc.setProvider("LOCAL");
        acc.setPassword(passwordEncoder.encode(req.getPassword()));
        accRepo.save(acc);

        sendOtp(email);
    }

    // ================= OTP =================
    public void sendOtp(String email) {

        String otp = otpUtil.generateOtp();

        EmailVerification ev = new EmailVerification();
        ev.setEmail(email);
        ev.setOtpCode(otp);
        ev.setExpiresAt(LocalDateTime.now().plusMinutes(5));
        ev.setAttemptCount(0);
        ev.setIsUsed(false);

        otpRepo.save(ev);
        emailUtil.sendOtp(email, otp);
    }

    public void verifyOtp(String email, String otp) {

        email = email.trim().toLowerCase();

        EmailVerification ev = otpRepo.findTopByEmailOrderByIdDesc(email)
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        if (Boolean.TRUE.equals(ev.getIsUsed()))
            throw new RuntimeException("OTP already used");

        if (ev.getExpiresAt().isBefore(LocalDateTime.now()))
            throw new RuntimeException("OTP expired");

        int attempts = ev.getAttemptCount() == null ? 0 : ev.getAttemptCount();

        if (attempts >= 5)
            throw new RuntimeException("Too many attempts");

        if (!ev.getOtpCode().equals(otp)) {
            ev.setAttemptCount(attempts + 1);
            otpRepo.save(ev);
            throw new RuntimeException("Wrong OTP");
        }

        ev.setIsUsed(true);
        otpRepo.save(ev);

        User user = userRepo.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setIsVerified(true);
        userRepo.save(user);
    }

    // ================= LOGIN =================
    public AuthResponse login(LoginRequest req) {

        String email = req.getEmail().trim().toLowerCase();

        User user = userRepo.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!Boolean.TRUE.equals(user.getIsVerified()))
            throw new RuntimeException("Email not verified");

        if (Boolean.TRUE.equals(user.getIsLocked()))
            throw new RuntimeException("Account is locked");

        AuthAccount acc = accRepo
                .findByUserIdAndProvider(user.getId(), "LOCAL")
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (!passwordEncoder.matches(req.getPassword(), acc.getPassword())) {

            int failed = user.getFailedAttempts() == null ? 0 : user.getFailedAttempts();
            failed++;

            user.setFailedAttempts(failed);

            if (failed >= 5) {
                user.setIsLocked(true);
            }

            userRepo.save(user);

            throw new RuntimeException("Wrong password");
        }

        user.setFailedAttempts(0);
        userRepo.save(user);

        acc.setLastLogin(LocalDateTime.now());
        accRepo.save(acc);

        String accessToken = jwtUtil.generateToken(user.getId(), user.getRole());
        String refreshToken = UUID.randomUUID().toString();

        saveRefreshToken(user.getId(), refreshToken);

        return new AuthResponse(accessToken, refreshToken);
    }

    // ================= GOOGLE =================
    public AuthResponse loginGoogle(String email) {

        email = email.trim().toLowerCase();

        User user = userRepo.findByEmailIgnoreCase(email).orElse(null);

        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setUsername(email);
            user.setIsVerified(true);
            user.setRole("USER");
            user.setIsActive(true);
            user.setIsLocked(false);
            user.setFailedAttempts(0);

            userRepo.save(user);
        }

        AuthAccount acc = accRepo
                .findByUserIdAndProvider(user.getId(), "GOOGLE")
                .orElse(null);

        if (acc == null) {
            acc = new AuthAccount();
            acc.setUserId(user.getId());
            acc.setProvider("GOOGLE");
            acc.setPassword("");
            accRepo.save(acc);
        }

        String access = jwtUtil.generateToken(user.getId(), user.getRole());
        String refresh = UUID.randomUUID().toString();

        saveRefreshToken(user.getId(), refresh);

        return new AuthResponse(access, refresh);
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
        rt.setExpiresAt(LocalDateTime.now().plusDays(7));
        refreshRepo.save(rt);
    }

    // ================= FORGOT PASSWORD =================
    public void forgotPassword(String email) {

        email = email.trim().toLowerCase();

        User user = userRepo.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));

        accRepo.findByUserIdAndProvider(user.getId(), "LOCAL")
                .orElseThrow(() -> new RuntimeException("Use Google login"));

        String code = otpUtil.generateOtp();

        PasswordReset pr = new PasswordReset();
        pr.setEmail(email);
        pr.setResetCode(code);
        pr.setExpiresAt(LocalDateTime.now().plusMinutes(5));
        pr.setIsUsed(false);

        passwordResetRepo.save(pr);
        emailUtil.sendOtp(email, code);
    }

    // ================= RESET PASSWORD =================
    public void resetPassword(String email, String code, String newPassword) {

        email = email.trim().toLowerCase();

        PasswordReset pr = passwordResetRepo
                .findTopByEmailOrderByIdDesc(email)
                .orElseThrow(() -> new RuntimeException("Reset request not found"));

        if (pr.getIsUsed())
            throw new RuntimeException("Code already used");

        if (pr.getExpiresAt().isBefore(LocalDateTime.now()))
            throw new RuntimeException("Code expired");

        if (!pr.getResetCode().equals(code))
            throw new RuntimeException("Wrong code");

        pr.setIsUsed(true);
        passwordResetRepo.save(pr);

        User user = userRepo.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        AuthAccount acc = accRepo
                .findByUserIdAndProvider(user.getId(), "LOCAL")
                .orElseThrow(() -> new RuntimeException("Account not found"));

        acc.setPassword(passwordEncoder.encode(newPassword));
        accRepo.save(acc);
    }

    //
    public void resendOtp(String email) {

        email = email.trim().toLowerCase();

        EmailVerification ev = otpRepo.findTopByEmailOrderByIdDesc(email)
                .orElseThrow(() -> new RuntimeException("OTP not found"));

        if (Boolean.TRUE.equals(ev.getIsUsed()))
            throw new RuntimeException("OTP already used");

        if (ev.getResendCount() != null && ev.getResendCount() >= 3)
            throw new RuntimeException("Resend limit reached");

        if (ev.getLastSentAt() != null &&
                ev.getLastSentAt().plusSeconds(60).isAfter(LocalDateTime.now()))
            throw new RuntimeException("Please wait before resend");

        String otp = otpUtil.generateOtp();

        ev.setOtpCode(otp);
        ev.setExpiresAt(LocalDateTime.now().plusMinutes(5));
        ev.setAttemptCount(0);

        ev.setResendCount(
                ev.getResendCount() == null ? 1 : ev.getResendCount() + 1
        );

        ev.setLastSentAt(LocalDateTime.now());

        otpRepo.save(ev);
        emailUtil.sendOtp(email, otp);
    }

}
