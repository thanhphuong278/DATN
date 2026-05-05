package com.datn.backend.exam.dto;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter @Setter
public class SubmitExamRequest {

    private List<AnswerDTO> answers;

    @Getter @Setter
    public static class AnswerDTO {
        private Integer questionId;
        private String selected;
    }
}
