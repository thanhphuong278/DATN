package com.datn.backend.user.repository;
import com.datn.backend.user.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserProgressRepository extends JpaRepository<UserProgress, Integer> {

    Optional<UserProgress> findByUserIdAndLesson_LessonId(Integer userId, Integer lessonId);

    List<UserProgress> findByUserId(Integer userId);
}

