package com.xmaswishes.processors;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;

import java.util.HashMap;
import java.util.Map;

public class JsonProcessor implements Processor {

    @Override
    public void process(Exchange exchange) throws Exception {
        String content = exchange.getIn().getBody(String.class);

        // Überprüfe, ob der Inhalt leer ist
        if (content == null || content.isEmpty()) {
            throw new IllegalArgumentException("Der Inhalt ist leer oder null.");
        }

        System.out.println("Inhalt der Nachricht: " + content);

        // Daten extrahieren
        Map<String, String> dataMap = parseKeyValueContent(content);

        String name = dataMap.getOrDefault("name", "Unknown");
        String wishText = dataMap.getOrDefault("wishText", "No wish provided");

        // JSON erstellen
        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("name", name);
        jsonMap.put("wishText", wishText);

        // JSON in String umwandeln
        String json = new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(jsonMap);

        // Werte im Body und Header speichern
        exchange.getIn().setBody(json);
        exchange.getIn().setHeader("name", name);
        exchange.getIn().setHeader("wishText", wishText);
    }

    private Map<String, String> parseKeyValueContent(String content) {
        Map<String, String> result = new HashMap<>();

        // Inhalt nach Zeilen trennen (funktioniert auch für `\r\n` bei Windows)
        String[] lines = content.split("\\r?\\n");

        for (String line : lines) {
            // Leerzeilen überspringen
            if (line.trim().isEmpty()) {
                continue;
            }

            // Schlüssel-Wert-Paar extrahieren
            String[] keyValue = line.split(":", 2); // Split nur am ersten Doppelpunkt
            if (keyValue.length == 2) {
                result.put(keyValue[0].trim(), keyValue[1].trim()); // Leerzeichen entfernen
            }
        }

        return result;
    }
}
