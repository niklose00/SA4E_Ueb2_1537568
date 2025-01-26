package com.xmaswishes.processors;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;

import java.nio.file.Files;
import java.nio.file.Paths;

public class FileProcessor implements Processor {
    @Override
    public void process(Exchange exchange) throws Exception {
        String filePath = exchange.getIn().getHeader("CamelFilePath", String.class);
        String content = new String(Files.readAllBytes(Paths.get(filePath)));
        exchange.getIn().setBody(content); // Dateiinhalt in den Exchange setzen
    }
}
