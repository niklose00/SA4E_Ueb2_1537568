package com.xmaswishes.processors;


import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

public class FileProcessor implements Processor {
    @Override
    public void process(Exchange exchange) throws Exception {
        String filePath = exchange.getIn().getHeader("CamelFilePath", String.class);

        // Überprüfe, ob die Datei existiert
        if (filePath == null || !Files.exists(Paths.get(filePath))) {
            throw new IllegalArgumentException("Die Datei existiert nicht: " + filePath);
        }

        // Dateiinhalt basierend auf Dateityp verarbeiten
        String content;
        if (filePath.endsWith(".pdf")) {
            System.out.println("Verarbeite PDF-Datei: " + filePath);
            content = extractTextFromPDF(filePath);
        } else if (filePath.endsWith(".txt")) {
            System.out.println("Verarbeite Text-Datei: " + filePath);
            content = new String(Files.readAllBytes(Paths.get(filePath)));
        } else {
            throw new IllegalArgumentException("Nicht unterstütztes Dateiformat: " + filePath);
        }

        exchange.getIn().setBody(content); // Dateiinhalt in den Exchange setzen
    }

    private String extractTextFromPDF(String filePath) throws Exception {
        try (PDDocument document = PDDocument.load(new File(filePath))) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        } catch (Exception e) {
            System.err.println("Fehler beim Verarbeiten der PDF-Datei: " + filePath);
            e.printStackTrace();
            return "Fehler beim Extrahieren des PDF-Textes.";
        }
    }
}
