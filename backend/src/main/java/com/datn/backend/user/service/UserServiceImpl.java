package com.datn.backend.user.service;

import com.datn.backend.user.dto.*;
import com.datn.backend.user.entity.*;
import com.datn.backend.user.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.datn.backend.user.mapper.UserDataMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserProgressRepository progressRepo;
    private final UserCourseRepository courseRepo;
    private final UserVocabRepository vocabRepo;

    private final UserDataMapper mapper;


    @Override
    public List<UserProgressResponse> getUserProgress(Integer userId) {

        return progressRepo.findByUserId(userId)
                .stream()
                .map(mapper::toProgress)
                .toList();
    }

    @Override
    public List<UserCourseResponse> getUserCourses(Integer userId) {

        return courseRepo.findByUserId(userId)
                .stream()
                .map(mapper::toCourse)
                .toList();
    }

    @Override
    public List<UserVocabResponse> getUserVocab(Integer userId) {

        return vocabRepo.findByUserId(userId)
                .stream()
                .map(mapper::toVocab)
                .toList();
    }

}
