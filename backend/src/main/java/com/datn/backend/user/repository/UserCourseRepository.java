package com.datn.backend.user.repository;
import com.datn.backend.user.entity.UserCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserCourseRepository extends JpaRepository<UserCourse, Integer> {

    List<UserCourse> findByUserId(Integer userId);

    boolean existsByUserIdAndCourse_CourseId(Integer userId, Integer courseId);
}
