require("dotenv").config();
const mongoose = require("mongoose");
const { runConsumer } = require("./kafka/consumer");

const startService = async () => {
  try {
    // MongoDB verbinden
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB verbunden.");

    // Kafka-Consumer starten
    await runConsumer();
  } catch (error) {
    console.error("Fehler beim Starten des Elfen-Services:", error.message);
    process.exit(1);
  }
};

startService();
