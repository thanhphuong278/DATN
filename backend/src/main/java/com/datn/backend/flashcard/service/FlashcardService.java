package com.datn.backend.flashcard.service;

import com.datn.backend.flashcard.dto.request.CreateFlashcardRequest;
import com.datn.backend.flashcard.dto.response.CardResponse;
import com.datn.backend.flashcard.dto.response.FlashcardDetailResponse;
import com.datn.backend.flashcard.dto.response.FlashcardResponse;
import com.datn.backend.flashcard.entity.Card;
import com.datn.backend.flashcard.entity.FlashcardSet;
import com.datn.backend.flashcard.repository.CardRepository;
import com.datn.backend.flashcard.repository.FlashcardSetRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FlashcardService {

    private final FlashcardSetRepository flashcardSetRepository;
    private final CardRepository cardRepository;

    @Transactional
    public FlashcardResponse createFlashcard(CreateFlashcardRequest request, Integer userId) {

        FlashcardSet set = new FlashcardSet();
        set.setTitle(request.getTitle());
        set.setDescription(request.getDescription());
        set.setIsPublic(request.getIsPublic());
        set.setUserId(userId);
        set.setTotalCards(request.getCards().size());

        FlashcardSet savedSet = flashcardSetRepository.save(set);

        List<Card> cards = request.getCards().stream().map(c -> {
            Card card = new Card();
            card.setFlashcardSetId(savedSet.getId());
            card.setTerm(c.getTerm());
            card.setMeaning(c.getMeaning());
            card.setExample(c.getExample());
            card.setImageUrl(c.getImageUrl());
            return card;
        }).toList();

        cardRepository.saveAll(cards);

        return FlashcardResponse.builder()
                .id(savedSet.getId())
                .title(savedSet.getTitle())
                .description(savedSet.getDescription())
                .isPublic(savedSet.getIsPublic())
                .totalCards(savedSet.getTotalCards())
                .userId(savedSet.getUserId())
                .build();
    }

    public List<FlashcardResponse> getMyFlashcards(Integer userId) {
        return flashcardSetRepository.findMyFlashcards(userId);
    }

    public List<FlashcardResponse> exploreFlashcards() {
        return flashcardSetRepository.findExploreFlashcards();
    }

//    private FlashcardResponse mapToResponse(FlashcardSet set) {
//        return FlashcardResponse.builder()
//                .id(set.getId())
//                .title(set.getTitle())
//                .description(set.getDescription())
//                .isPublic(set.getIsPublic())
//                .totalCards(set.getTotalCards())
//                .userId(set.getUserId())
//                .build();
//    }


    public FlashcardDetailResponse getFlashcardDetail(Long id) {

        FlashcardSet set = flashcardSetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flashcard not found"));

        List<CardResponse> cards = cardRepository
                .findByFlashcardSetId(set.getId())
                .stream()
                .map(c -> CardResponse.builder()
                        .id(c.getId())
                        .term(c.getTerm())
                        .meaning(c.getMeaning())
                        .example(c.getExample())
                        .imageUrl(c.getImageUrl())
                        .build()
                ).toList();

        return FlashcardDetailResponse.builder()
                .id(set.getId())
                .title(set.getTitle())
                .description(set.getDescription())
                .isPublic(set.getIsPublic())
                .userId(set.getUserId())
                .cards(cards)
                .build();
    }
}
