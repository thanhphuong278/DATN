package com.datn.backend.exam.service;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GoogleSheetService {

    private final RestTemplate restTemplate = new RestTemplate();

    public List<SheetRow> fetchSheet(String sheetId, String sheetName) {

        String url = String.format(
                "https://opensheet.elk.sh/%s/%s",
                sheetId,
                sheetName
        );

        List<?> raw = restTemplate.getForObject(url, List.class);

        List<SheetRow> result = new ArrayList<>();

        if (raw == null) return result;

        for (Object obj : raw) {

            var map = (java.util.Map<?, ?>) obj;

            SheetRow row = new SheetRow();
            row.setQuestion(trim(map.get("question")));
            row.setOptionA(trim(map.get("A")));
            row.setOptionB(trim(map.get("B")));
            row.setOptionC(trim(map.get("C")));
            row.setOptionD(trim(map.get("D")));
            row.setCorrect(trim(map.get("correct")));
            row.setType(trim(map.get("type")));
            row.setAudioUrl(trim(map.get("audio_url")));
            row.setExplanation(trim(map.get("explanation")));

            result.add(row);
        }

        return result;
    }

    //tránh " A " != "A" → sai đáp án
    private String trim(Object val) {
        return val == null ? null : val.toString().trim();
    }


    @Data
    public static class SheetRow {
        private String question;
        private String optionA;
        private String optionB;
        private String optionC;
        private String optionD;
        private String correct;
        private String type;
        private String audioUrl;
        private String explanation;
    }
}
