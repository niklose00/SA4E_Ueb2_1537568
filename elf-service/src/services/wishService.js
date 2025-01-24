const Wish = require("../models/wish");

const processWishEvent = async (event) => {
  if (event.type === "WishCreated") {
    const { id } = event.data;

    // Wunsch in MongoDB aktualisieren
    const updatedWish = await Wish.findByIdAndUpdate(
      id,
      { status: "In Bearbeitung" },
      { new: true }
    );

    if (!updatedWish) {
      throw new Error(`Wunsch mit ID ${id} nicht gefunden`);
    }

    console.log(`Wunsch ${id} wurde auf 'In Bearbeitung' aktualisiert.`);
  }
};

module.exports = { processWishEvent };
