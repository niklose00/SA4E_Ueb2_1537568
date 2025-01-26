const Wish = require("../models/wish");
const { sendKafkaEvent } = require("../kafka/kafkaProducer");

module.exports = {
  createWish: async (_, { name, wishText }) => {
    const newWish = new Wish({ name, wishText });
    await newWish.save();

    // Kafka-Event senden
    await sendKafkaEvent("wish-events", { type: "WishCreated", data: newWish });

    return newWish;
  }
};
