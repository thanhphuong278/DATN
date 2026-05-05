package com.datn.backend.user.service;

import com.datn.backend.user.dto.*;

import java.util.List;

public interface UserService {

    List<UserProgressResponse> getUserProgress(Integer userId);

    List<UserCourseResponse> getUserCourses(Integer userId);

    List<UserVocabResponse> getUserVocab(Integer userId);

}
