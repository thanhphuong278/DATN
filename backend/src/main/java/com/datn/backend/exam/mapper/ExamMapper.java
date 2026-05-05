package com.datn.backend.exam.mapper;
import com.datn.backend.exam.dto.ExamResponse;
import com.datn.backend.exam.dto.QuestionResponse;
import com.datn.backend.exam.entity.Exam;
import com.datn.backend.exam.entity.Question;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class ExamMapper {

    public ExamResponse toExamResponse(Exam exam) {

        ExamResponse res = new ExamResponse();
        res.setExamId(exam.getExamId());
        res.setTitle(exam.getTitle());

        List<QuestionResponse> qList =
                exam.getQuestions() == null ? List.of() :
                        exam.getQuestions().stream()
                                .map(this::toQuestion)
                                .toList();

        res.setQuestions(qList);

        return res;
    }

    private QuestionResponse toQuestion(Question q) {

        QuestionResponse res = new QuestionResponse();
        res.setQuestionId(q.getQuestionId());
        res.setContent(q.getContent());

        List<QuestionResponse.OptionDTO> opts =
                q.getOptions() == null ? List.of() :
                        q.getOptions().stream().map(o -> {
                            QuestionResponse.OptionDTO dto = new QuestionResponse.OptionDTO();
                            dto.setLabel(o.getOptionLabel());
                            dto.setContent(o.getContent());
                            return dto;
                        }).toList();

        res.setOptions(opts);
        return res;
    }
}
