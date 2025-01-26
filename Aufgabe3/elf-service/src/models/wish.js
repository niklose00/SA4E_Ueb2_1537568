const mongoose = require("mongoose");

const wishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  wishText: { type: String, required: true },
  status: {
    type: String,
    enum: ["Formuliert", "In Bearbeitung", "Abgeschlossen"],
    default: "Formuliert"
  },
});

module.exports = mongoose.model("Wish", wishSchema);
