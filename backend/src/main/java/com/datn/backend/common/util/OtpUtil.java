package com.datn.backend.common.util;

import org.springframework.stereotype.Component;

@Component
public class OtpUtil {

    public String generateOtp() {
        return String.valueOf((int)(Math.random() * 900000) + 100000);
    }
}

