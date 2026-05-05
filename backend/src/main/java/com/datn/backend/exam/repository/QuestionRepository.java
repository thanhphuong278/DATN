package com.datn.backend.exam.repository;
import com.datn.backend.exam.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findByExam_ExamId(Integer examId);
}
