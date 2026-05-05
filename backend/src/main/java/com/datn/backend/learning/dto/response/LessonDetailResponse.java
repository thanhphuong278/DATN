package com.datn.backend.learning.dto.response;
import lombok.Getter;
import lombok.Setter;
import java.util.List;


@Getter
@Setter
public class LessonDetailResponse {

    private Integer lessonId;
    private String title;

    private List<String> vocabularies;
    private List<String> grammars;
}
