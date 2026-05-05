package com.datn.backend.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class UserCourseResponse {

    private Integer courseId;
    private LocalDateTime enrolledAt;
}
