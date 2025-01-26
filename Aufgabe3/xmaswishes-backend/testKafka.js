const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  brokers: ["kafka:9092"], // Broker-Adresse anpassen
});

(async () => {
  const producer = kafka.producer();
  try {
    await producer.connect();
    console.log("Verbindung zu Kafka erfolgreich!");
    await producer.disconnect();
  } catch (error) {
    console.error("Verbindung zu Kafka fehlgeschlagen:", error.message);
  }
})();
