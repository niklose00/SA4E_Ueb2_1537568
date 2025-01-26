package com.xmaswishes.processors;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;

import java.util.HashMap;
import java.util.Map;

public class JsonProcessor implements Processor {
    @Override
    public void process(Exchange exchange) throws Exception {
        String content = exchange.getIn().getBody(String.class);

        // Dummy-Daten extrahieren
        Map<String, Object> jsonMap = new HashMap<>();
        String name = extractName(content);
        String wishText = extractWish(content);
        jsonMap.put("name", name);
        jsonMap.put("wishText", wishText);

        // JSON erstellen
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(jsonMap);

        // Werte im Body und Header speichern
        exchange.getIn().setBody(json);
        exchange.getIn().setHeader("name", name);
        exchange.getIn().setHeader("wishText", wishText);
    }

    private String extractName(String content) {
        // Name aus dem Inhalt extrahieren (Dummy)
        return "John Doe";
    }

    private String extractWish(String content) {
        // Wunsch aus dem Inhalt extrahieren (Dummy)
        return "I want a new bike!";
    }

}
