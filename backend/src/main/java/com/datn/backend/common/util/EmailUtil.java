package com.datn.backend.common.util;

import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Component
@RequiredArgsConstructor
public class EmailUtil {

    private final JavaMailSender mailSender;

    public void sendOtp(String to, String otp) {

        try {
            SimpleMailMessage msg = new SimpleMailMessage();

            msg.setFrom("your_email@gmail.com"); // ⚠️ sửa lại
            msg.setTo(to);
            msg.setSubject("Mã OTP của bạn");

            msg.setText("""
                Xin chào,

                Mã OTP của bạn là: %s

                Mã có hiệu lực trong 5 phút.
                Không chia sẻ mã này với bất kỳ ai.

                - Hệ thống
                """.formatted(otp));

            mailSender.send(msg);

            System.out.println("OTP sent to " + to + ": " + otp);

        } catch (Exception e) {
            throw new RuntimeException("Send mail failed: " + e.getMessage());
        }
    }
}


