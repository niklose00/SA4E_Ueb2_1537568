package com.xmaswishes.routes;

import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.LoggingLevel;

public class FileRoute extends RouteBuilder {
    @Override
    public void configure() throws Exception {
        // Fehlerbehandlung
        onException(Exception.class)
                .log(LoggingLevel.ERROR, "Fehler bei der Verarbeitung: ${exception.message}")
                .to("file:error_wishes")
                .handled(true);

        // Hauptroute
        from("file:input?noop=true")
                .routeId("FileProcessingRoute")
                .log("Neue Datei erkannt: ${header.CamelFileName}")
                .process(new com.xmaswishes.processors.FileProcessor()) // Dateiinhalt lesen
                .process(new com.xmaswishes.processors.JsonProcessor()) // JSON-Transformation
                .setHeader("Content-Type", constant("application/json")) // HTTP-Header setzen
                .setBody().simple("""
                {
                    "query": "mutation { createWish(name: \\"${header.name}\\", wishText: \\"${header.wishText}\\") { id name wishText status } }"
                }
            """) // Dynamische GraphQL-Mutation
                .to("http://localhost:4000/graphql") // HTTP-Aufruf
                .choice()
                .when(header("CamelHttpResponseCode").isEqualTo(200))
                .log("Wish erfolgreich erstellt: ${header.CamelFileName}")
                .to("file:success_wishes")
                .otherwise()
                .log(LoggingLevel.ERROR, "Fehler bei der API-Anfrage für Datei: ${header.CamelFileName}")
                .to("file:error_wishes");
    }

}
