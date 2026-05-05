package com.datn.backend.learning.mapper;
import com.datn.backend.learning.entity.Grammar;
import com.datn.backend.learning.entity.Lesson;
import com.datn.backend.learning.entity.Vocabulary;
import org.springframework.stereotype.Component;
import com.datn.backend.learning.entity.Course;
import com.datn.backend.learning.entity.Level;
import com.datn.backend.learning.dto.response.*;

@Component
public class LearningMapper {

    public LevelResponse toLevel(Level level) {
        LevelResponse res = new LevelResponse();
        res.setLevelId(level.getLevelId());
        res.setLevelName(level.getLevelName());
        return res;
    }

    public CourseResponse toCourse(Course course) {
        CourseResponse res = new CourseResponse();

        res.setCourseId(course.getCourseId());
        res.setCourseName(course.getCourseName());
        res.setLevelId(course.getLevel().getLevelId());

        // default (future AI/user tracking)
        res.setProgress(0);
        res.setIsUnlocked(true);

        return res;
    }

    public LessonSimpleResponse toLessonSimple(Lesson lesson) {
        LessonSimpleResponse res = new LessonSimpleResponse();

        res.setLessonId(lesson.getLessonId());
        res.setTitle(lesson.getTitle());
        res.setLessonOrder(lesson.getOrderIndex());

        //không set logic ở đây
        res.setIsCompleted(false);
        res.setIsUnlocked(false);

        return res;
    }


    public LessonDetailResponse toLessonDetail(Lesson lesson) {
        LessonDetailResponse res = new LessonDetailResponse();

        res.setLessonId(lesson.getLessonId());
        res.setTitle(lesson.getTitle());

        res.setVocabularies(
                lesson.getVocabularies()
                        .stream()
                        .map(Vocabulary::getWordKr)
                        .toList()
        );

        res.setGrammars(
                lesson.getGrammars()
                        .stream()
                        .map(Grammar::getTitle)
                        .toList()
        );

        return res;
    }

}
