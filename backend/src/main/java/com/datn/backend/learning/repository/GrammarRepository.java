package com.datn.backend.learning.repository;

import com.datn.backend.learning.entity.Grammar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrammarRepository extends JpaRepository<Grammar, Integer> {}


