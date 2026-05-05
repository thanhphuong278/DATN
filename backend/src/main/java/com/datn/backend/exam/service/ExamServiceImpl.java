package com.datn.backend.exam.service;
import com.datn.backend.exam.dto.ExamResponse;
import com.datn.backend.exam.dto.ResultResponse;
import com.datn.backend.exam.dto.SubmitExamRequest;
import com.datn.backend.exam.entity.Exam;
import com.datn.backend.exam.entity.ExamResult;
import com.datn.backend.exam.entity.Question;
import com.datn.backend.exam.entity.QuestionOption;
import com.datn.backend.exam.entity.UserAnswer;
import com.datn.backend.exam.mapper.ExamMapper;
import com.datn.backend.exam.repository.ExamRepository;
import com.datn.backend.exam.repository.ExamResultRepository;
import com.datn.backend.exam.repository.QuestionRepository;
import com.datn.backend.exam.repository.UserAnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamService {

    private final ExamRepository examRepo;
    private final QuestionRepository questionRepo;
    private final ExamResultRepository resultRepo;
    private final UserAnswerRepository answerRepo;
    private final GoogleSheetService googleSheetService;
    private final ExamMapper examMapper;

    @Override
    public List<Exam> getExams() {
        return examRepo.findAll();
    }

    @Override
    public ExamResponse getExam(Integer examId) {
        Exam exam = examRepo.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        return examMapper.toExamResponse(exam);
    }

    @Override
    @Transactional
    public ResultResponse submitExam(Integer userId, Integer examId, SubmitExamRequest request) {

        if (request.getAnswers() == null || request.getAnswers().isEmpty()) {
            throw new RuntimeException("Answers cannot be empty");
        }

        Exam exam = examRepo.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        List<Question> questions = questionRepo.findByExam_ExamId(examId);

        if (questions.isEmpty()) {
            throw new RuntimeException("Exam has no questions");
        }

        int correct = 0;

        ExamResult result = new ExamResult();
        result.setUserId(userId);
        result.setExam(exam);
        result.setTakenAt(LocalDateTime.now());

        resultRepo.save(result);

        Map<Integer, Question> questionMap =
                questions.stream().collect(Collectors.toMap(
                        Question::getQuestionId,
                        q -> q
                ));

        for (SubmitExamRequest.AnswerDTO ans : request.getAnswers()) {

            Integer questionId = ans.getQuestionId(); // DTO PHẢI là Integer

            Question q = questionMap.get(questionId);

            if (q == null) continue;

            boolean isCorrect =
                    q.getCorrectAnswer().trim()
                            .equalsIgnoreCase(ans.getSelected().trim());

            if (isCorrect) correct++;

            UserAnswer ua = new UserAnswer();
            ua.setResult(result);
            ua.setQuestion(q);
            ua.setSelectedAnswer(ans.getSelected());
            ua.setIsCorrect(isCorrect);

            answerRepo.save(ua);
        }

        float score = (float) correct / questions.size() * 100;

        result.setScore(score);
        resultRepo.save(result);

        ResultResponse res = new ResultResponse();
        res.setScore(score);
        res.setCorrect(correct);
        res.setTotal(questions.size());

        return res;
    }

    @Transactional
    public void importExamFromSheet(Integer examId) {

        Exam exam = examRepo.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        if (exam.getSourceUrl() == null || exam.getSheetName() == null) {
            throw new RuntimeException("Missing Google Sheet info");
        }

        String sheetId = extractSheetId(exam.getSourceUrl());

        List<GoogleSheetService.SheetRow> rows =
                googleSheetService.fetchSheet(sheetId, exam.getSheetName());

        if (rows.isEmpty()) {
            throw new RuntimeException("Sheet is empty");
        }

        List<Question> questions = new java.util.ArrayList<>();

        for (GoogleSheetService.SheetRow row : rows) {

            validateRow(row);

            Question q = new Question();
            q.setExam(exam);
            q.setContent(row.getQuestion());
            q.setCorrectAnswer(row.getCorrect());
            q.setQuestionType(row.getType());
            q.setExplanation(row.getExplanation());

            List<QuestionOption> options = new java.util.ArrayList<>();

            options.add(createOption(q, "A", row.getOptionA()));
            options.add(createOption(q, "B", row.getOptionB()));
            options.add(createOption(q, "C", row.getOptionC()));
            options.add(createOption(q, "D", row.getOptionD()));

            q.setOptions(options);

            questions.add(q);
        }

        questionRepo.saveAll(questions);

        exam.setIsSynced(true);
        exam.setSyncStatus("SUCCESS");
        exam.setLastSyncedAt(LocalDateTime.now());

        examRepo.save(exam);
    }

    @Transactional
    public void resyncExam(Integer examId) {

        Exam exam = examRepo.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        List<Question> oldQuestions = questionRepo.findByExam_ExamId(examId);
        questionRepo.deleteAll(oldQuestions);

        importExamFromSheet(examId);

        exam.setSyncStatus("SUCCESS");
        exam.setLastSyncedAt(LocalDateTime.now());

        examRepo.save(exam);
    }

    private QuestionOption createOption(Question q, String label, String content) {
        QuestionOption opt = new QuestionOption();
        opt.setQuestion(q);
        opt.setOptionLabel(label);
        opt.setContent(content);
        return opt;
    }

    private void validateRow(GoogleSheetService.SheetRow row) {

        if (row.getQuestion() == null || row.getCorrect() == null) {
            throw new RuntimeException("Invalid row");
        }

        if (row.getOptionA() == null ||
                row.getOptionB() == null ||
                row.getOptionC() == null ||
                row.getOptionD() == null) {
            throw new RuntimeException("Missing options");
        }
    }

    private String extractSheetId(String url) {
        try {
            return url.split("/d/")[1].split("/")[0];
        } catch (Exception e) {
            throw new RuntimeException("Invalid Google Sheet URL");
        }
    }
}


