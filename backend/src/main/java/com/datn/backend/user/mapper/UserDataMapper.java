package com.datn.backend.user.mapper;

import com.datn.backend.user.dto.*;
import com.datn.backend.user.entity.*;
import org.springframework.stereotype.Component;

@Component
public class UserDataMapper {

    public UserProgressResponse toProgress(UserProgress p) {

        UserProgressResponse res = new UserProgressResponse();

        res.setLessonId(p.getLesson().getLessonId());
        res.setStatus(p.getStatus());
        res.setScore(p.getScore());
        res.setAttempts(p.getAttempts());
        res.setLastAccess(p.getLastAccess());

        return res;
    }

    public UserCourseResponse toCourse(UserCourse uc) {

        UserCourseResponse res = new UserCourseResponse();

        res.setCourseId(uc.getCourse().getCourseId());
        res.setEnrolledAt(uc.getEnrolledAt());

        return res;
    }

    public UserVocabResponse toVocab(UserVocab uv) {

        UserVocabResponse res = new UserVocabResponse();

        res.setVocabId(uv.getVocabulary().getVocabId());
        res.setIsFavorite(uv.getIsFavorite());
        res.setIsKnown(uv.getIsKnown());
        res.setLastReview(uv.getLastReview());

        return res;
    }
}
