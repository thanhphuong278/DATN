package com.datn.backend.user.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_vocab", schema = "user_data")
@Getter @Setter
public class UserVocab {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @ManyToOne
    @JoinColumn(name = "vocab_id")
    private com.datn.backend.learning.entity.Vocabulary vocabulary;

    @Column(name = "is_favorite")
    private Boolean isFavorite = false;

    @Column(name = "is_known")
    private Boolean isKnown = false;

    @Column(name = "last_review")
    private LocalDateTime lastReview;
}

