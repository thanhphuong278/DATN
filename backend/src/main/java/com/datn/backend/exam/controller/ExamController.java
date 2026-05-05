package com.datn.backend.exam.controller;

import com.datn.backend.exam.entity.Exam;
import com.datn.backend.exam.dto.SubmitExamRequest;
import com.datn.backend.exam.dto.ExamResponse;
import com.datn.backend.exam.dto.ResultResponse;
import com.datn.backend.exam.service.ExamService;
import com.datn.backend.auth.entity.User;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@RestController
@RequestMapping("/api/exam")
@RequiredArgsConstructor
@PreAuthorize("hasRole('USER')")
public class ExamController {

    private final ExamService service;

    //lấy user từ JWT
    private Integer getCurrentUserId() {
        User user = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return user.getId();
    }

    // ================= GET LIST =================
    @GetMapping
    public List<Exam> getExams() {
        return service.getExams();
    }

    // ================= GET DETAIL =================
    @GetMapping("/{id}")
    public ExamResponse getExam(@PathVariable Integer id) {
        return service.getExam(id);
    }

    // ================= SUBMIT =================
    @PostMapping("/{id}/submit")
    public ResultResponse submit(
            @PathVariable Integer id,
            @RequestBody SubmitExamRequest request
    ) {
        return service.submitExam(getCurrentUserId(), id, request);
    }
}