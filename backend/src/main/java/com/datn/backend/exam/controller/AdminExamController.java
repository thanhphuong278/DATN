package com.datn.backend.exam.controller;

import com.datn.backend.exam.entity.Exam;
import com.datn.backend.exam.repository.ExamRepository;
import lombok.RequiredArgsConstructor;
import com.datn.backend.exam.service.ExamService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin/exams")
@PreAuthorize("hasRole('ADMIN')")
public class AdminExamController {

    private final ExamRepository examRepo;
    private final ExamService examService;

    @PostMapping
    public Exam create(@RequestBody Exam exam) {
        exam.setIsSynced(false);
        exam.setSourceType("MANUAL");
        exam.setSyncStatus("PENDING");
        exam.setCreatedAt(java.time.LocalDateTime.now());
        return examRepo.save(exam);
    }

    @GetMapping
    public List<Exam> getAll() {
        return examRepo.findAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        examRepo.deleteById(id);
    }

    @PostMapping("/{id}/import")
    public void importSheet(@PathVariable Integer id) {
        examService.importExamFromSheet(id);
    }

    @PostMapping("/{id}/resync")
    public void resync(@PathVariable Integer id) {
        examService.resyncExam(id);
    }

}
