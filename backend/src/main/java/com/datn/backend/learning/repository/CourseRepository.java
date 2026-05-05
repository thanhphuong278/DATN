package com.datn.backend.learning.repository;

import com.datn.backend.learning.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
    List<Course> findByLevel_LevelId(Integer levelId);
}

