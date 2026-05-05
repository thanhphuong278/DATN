package com.datn.backend.exam.repository;

import com.datn.backend.exam.entity.AudioFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AudioRepository extends JpaRepository<AudioFile, Integer> {
}

