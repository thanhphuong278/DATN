package com.datn.backend.learning.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseResponse {
    private Integer courseId;
    private String courseName;
    private Integer levelId;

    // future-proof
    private Integer progress;
    private Boolean isUnlocked;
}

