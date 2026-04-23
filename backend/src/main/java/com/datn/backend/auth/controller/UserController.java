package com.datn.backend.auth.controller;

import com.datn.backend.auth.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/profile")
    public String getProfile(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return "Hello userId = " + user.getId();
    }
}
