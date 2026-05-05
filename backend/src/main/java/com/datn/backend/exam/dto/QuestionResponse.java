package com.datn.backend.exam.dto;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter @Setter
public class QuestionResponse {

    private Integer questionId;
    private String content;
    private List<OptionDTO> options;

    @Getter @Setter
    public static class OptionDTO {
        private String label;
        private String content;
    }
}
