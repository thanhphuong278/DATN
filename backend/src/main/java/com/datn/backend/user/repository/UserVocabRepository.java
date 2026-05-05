package com.datn.backend.user.repository;
import com.datn.backend.user.entity.UserVocab;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserVocabRepository extends JpaRepository<UserVocab, Integer> {

    List<UserVocab> findByUserId(Integer userId);

    List<UserVocab> findByUserIdAndIsFavoriteTrue(Integer userId);
}
