package com.datn.backend.exam.dto;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ResultResponse {

    private Float score;
    private Integer total;
    private Integer correct;
}
