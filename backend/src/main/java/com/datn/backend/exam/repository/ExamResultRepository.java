package com.datn.backend.exam.repository;
import com.datn.backend.exam.entity.ExamResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExamResultRepository extends JpaRepository<ExamResult, Integer> {

    List<ExamResult> findByUserId(Integer userId);

    List<ExamResult> findByExam_ExamId(Integer examId);
}

