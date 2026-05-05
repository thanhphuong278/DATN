package com.datn.backend.exam.repository;
import com.datn.backend.exam.entity.QuestionOption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionRepository extends JpaRepository<QuestionOption, Integer> {}
