package com.datn.backend.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class UserProgressResponse {

    private Integer lessonId;
    private String status;
    private Float score;
    private Integer attempts;
    private LocalDateTime lastAccess;
}
