package com.datn.backend.learning.service;
import com.datn.backend.learning.dto.response.*;
import java.util.List;

public interface LearningService {

    List<LevelResponse> getLevels();

    List<CourseResponse> getCourses(Integer levelId);

    List<LessonSimpleResponse> getLessons(Integer courseId, Integer userId);

    LessonDetailResponse getLessonDetail(Integer lessonId);

    void completeLesson(Integer userId, Integer lessonId);
}


