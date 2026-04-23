package com.datn.backend.auth.mapper;

import com.datn.backend.auth.dto.RegisterRequest;
import com.datn.backend.auth.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(RegisterRequest req) {
        User u = new User();
        u.setEmail(req.getEmail());
        u.setUsername(req.getUsername());
        return u;
    }
}

