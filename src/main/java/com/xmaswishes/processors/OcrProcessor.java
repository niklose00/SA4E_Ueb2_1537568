package com.xmaswishes.processors;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;

public class OcrProcessor implements Processor {
    @Override
    public void process(Exchange exchange) throws Exception {
        String filePath = exchange.getIn().getHeader("CamelFilePath", String.class);

        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath("/path/to/tessdata"); // Pfad zu Tesseract-Daten
        String text = tesseract.doOCR(new java.io.File(filePath));
        exchange.getIn().setBody(text); // OCR-Text als Body setzen
    }
}
