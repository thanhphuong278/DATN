package com.datn.backend.exam.service;
import com.datn.backend.exam.dto.ExamResponse;
import com.datn.backend.exam.dto.ResultResponse;
import com.datn.backend.exam.dto.SubmitExamRequest;
import com.datn.backend.exam.entity.Exam;
import java.util.List;

public interface ExamService {

    List<Exam> getExams();

    ExamResponse getExam(Integer examId);

    ResultResponse submitExam(Integer userId, Integer examId, SubmitExamRequest request);

    void importExamFromSheet(Integer examId);
    void resyncExam(Integer examId);

}

