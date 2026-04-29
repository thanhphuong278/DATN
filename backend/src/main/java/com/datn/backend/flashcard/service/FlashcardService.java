package com.datn.backend.flashcard.service;

import com.datn.backend.flashcard.dto.request.CreateFlashcardRequest;
import com.datn.backend.flashcard.dto.request.UpdateFlashcardRequest;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    private FlashcardResponse mapToResponse(FlashcardSet set) {
        return FlashcardResponse.builder()
                .id(set.getId())
                .title(set.getTitle())
                .description(set.getDescription())
                .isPublic(set.getIsPublic())
                .totalCards(set.getTotalCards())
                .userId(set.getUserId())
                .build();
    }


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

    @Transactional
    public FlashcardResponse copyFlashcard(Long flashcardId, Integer userId) {

        FlashcardSet original = flashcardSetRepository.findById(flashcardId)
                .orElseThrow(() -> new RuntimeException("Flashcard not found"));

        FlashcardSet copy = new FlashcardSet();
        copy.setTitle(original.getTitle());
        copy.setDescription(original.getDescription());
        copy.setIsPublic(false);
        copy.setUserId(userId);
        copy.setCopiedFromId(original.getId());
        copy.setTotalCards(original.getTotalCards());

        FlashcardSet savedCopy = flashcardSetRepository.save(copy);

        List<Card> originalCards = cardRepository.findByFlashcardSetId(original.getId());

        List<Card> newCards = originalCards.stream().map(c -> {
            Card newCard = new Card();
            newCard.setFlashcardSetId(savedCopy.getId());
            newCard.setTerm(c.getTerm());
            newCard.setMeaning(c.getMeaning());
            newCard.setExample(c.getExample());
            newCard.setImageUrl(c.getImageUrl());
            return newCard;
        }).toList();

        cardRepository.saveAll(newCards);

        return mapToResponse(savedCopy);
    }

    @Transactional
    public FlashcardResponse updateFlashcard(Long id, UpdateFlashcardRequest request, Integer userId) {

        FlashcardSet set = flashcardSetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flashcard not found"));

        if (!set.getUserId().equals(userId)) {
            throw new RuntimeException("Không có quyền sửa");
        }

        set.setTitle(request.getTitle());
        set.setDescription(request.getDescription());
        set.setIsPublic(request.getIsPublic());

        List<Card> existingCards = cardRepository.findByFlashcardSetId(id);

        Map<Long, Card> existingMap = existingCards.stream()
                .collect(Collectors.toMap(Card::getId, c -> c));

        List<Card> newList = new ArrayList<>();

        for (var c : request.getCards()) {

            if (c.getId() != null && existingMap.containsKey(c.getId())) {
                Card old = existingMap.get(c.getId());
                old.setTerm(c.getTerm());
                old.setMeaning(c.getMeaning());
                old.setExample(c.getExample());
                old.setImageUrl(c.getImageUrl());
                newList.add(old);

                existingMap.remove(c.getId()); // đã xử lý
            } else {
                Card newCard = new Card();
                newCard.setFlashcardSetId(id);
                newCard.setTerm(c.getTerm());
                newCard.setMeaning(c.getMeaning());
                newCard.setExample(c.getExample());
                newCard.setImageUrl(c.getImageUrl());
                newList.add(newCard);
            }
        }

        cardRepository.deleteAll(existingMap.values());

        cardRepository.saveAll(newList);

        set.setTotalCards(newList.size());

        return mapToResponse(set);
    }
}
