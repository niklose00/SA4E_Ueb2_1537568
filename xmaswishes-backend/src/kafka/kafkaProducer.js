const { Kafka } = require("kafkajs");
const kafka = new Kafka({ clientId: "wishes-service", brokers: ["kafka:9092"]
});

const producer = kafka.producer();

const sendKafkaEvent = async (topic, message) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }]
  });
};

module.exports = { sendKafkaEvent };
