package com.xmaswishes;

import org.apache.camel.CamelContext;
import org.apache.camel.impl.DefaultCamelContext;

public class Main {
    public static void main(String[] args) {
        try (CamelContext camelContext = new DefaultCamelContext()) {
            // Routen hinzufügen
            camelContext.addRoutes(new com.xmaswishes.routes.FileRoute());

            // CamelContext starten
            camelContext.start();
            System.out.println("Apache Camel läuft. Drücken Sie STRG+C, um zu beenden.");
            Thread.sleep(10000); // Laufzeit simulieren
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
