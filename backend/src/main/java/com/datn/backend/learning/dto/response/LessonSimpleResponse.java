package com.datn.backend.learning.dto.response;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LessonSimpleResponse {

    private Integer lessonId;
    private String title;
    private Integer lessonOrder;

    private Boolean isCompleted;
    private Boolean isUnlocked;
}
