package com.datn.backend.learning.service;

import com.datn.backend.learning.entity.Course;
import com.datn.backend.learning.entity.Lesson;
import com.datn.backend.learning.entity.Level;
import com.datn.backend.learning.mapper.LearningMapper;
import com.datn.backend.learning.repository.CourseRepository;
import com.datn.backend.learning.repository.LessonRepository;
import com.datn.backend.learning.repository.LevelRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.datn.backend.learning.dto.response.*;
import com.datn.backend.user.entity.UserProgress;
import com.datn.backend.user.repository.UserProgressRepository;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LearningServiceImpl implements LearningService {

    private final LevelRepository levelRepo;
    private final CourseRepository courseRepo;
    private final LessonRepository lessonRepo;
    private final UserProgressRepository progressRepo;

    private final LearningMapper mapper;

    @Override
    public List<LevelResponse> getLevels() {
        return levelRepo.findAll()
                .stream()
                .map(mapper::toLevel)
                .toList();
    }

    @Override
    public List<CourseResponse> getCourses(Integer levelId) {
        return courseRepo.findByLevel_LevelId(levelId)
                .stream()
                .map(mapper::toCourse)
                .toList();
    }

    @Override
    public List<LessonSimpleResponse> getLessons(Integer courseId, Integer userId) {

        List<Lesson> lessons =
                lessonRepo.findByCourse_CourseIdOrderByOrderIndex(courseId);

        Map<Integer, UserProgress> progressMap =
                progressRepo.findByUserId(userId)
                        .stream()
                        .filter(p -> p.getLesson() != null)
                        .collect(Collectors.toMap(
                                p -> p.getLesson().getLessonId(),
                                p -> p
                        ));

        List<LessonSimpleResponse> result = new ArrayList<>();

        for (int i = 0; i < lessons.size(); i++) {

            Lesson lesson = lessons.get(i);
            LessonSimpleResponse dto = mapper.toLessonSimple(lesson);

            UserProgress progress = progressMap.get(lesson.getLessonId());

            boolean completed =
                    progress != null && "COMPLETED".equals(progress.getStatus());

            dto.setIsCompleted(completed);

            if (i == 0) {
                dto.setIsUnlocked(true);
            } else {
                Lesson prev = lessons.get(i - 1);
                UserProgress prevProgress = progressMap.get(prev.getLessonId());

                dto.setIsUnlocked(
                        prevProgress != null &&
                                "COMPLETED".equals(prevProgress.getStatus())
                );
            }

            result.add(dto);
        }

        return result;
    }

    @Override
    public LessonDetailResponse getLessonDetail(Integer lessonId) {
        Lesson lesson = lessonRepo.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        return mapper.toLessonDetail(lesson);
    }

    @Override
    public void completeLesson(Integer userId, Integer lessonId) {

        Lesson lesson = lessonRepo.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        UserProgress progress = progressRepo
                .findByUserIdAndLesson_LessonId(userId, lessonId)
                .orElseGet(() -> {
                    UserProgress p = new UserProgress();
                    p.setUserId(userId);
                    p.setLesson(lesson);
                    p.setAttempts(0);
                    return p;
                });

        progress.setStatus("COMPLETED");
        progress.setLastAccess(LocalDateTime.now());

        progressRepo.save(progress);
    }

}
