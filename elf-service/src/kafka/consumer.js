const kafka = require("./kafkaConfig");
const { processWishEvent } = require("../services/wishService");

const consumer = kafka.consumer({ groupId: "elf-service-group" });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "wish-events", fromBeginning: true });

  console.log("Elfen-Service hört auf 'wish-events'...");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const event = JSON.parse(message.value.toString());
        console.log("Event empfangen:", event);

        await processWishEvent(event);
      } catch (error) {
        console.error("Fehler bei der Verarbeitung des Events:", error.message);
      }
    },
  });
};

module.exports = { runConsumer };
