package com.datn.backend.exam.dto;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter @Setter
public class ExamResponse {

    private Integer examId;
    private String title;
    private List<QuestionResponse> questions;
}
