const Wish = require("../models/wish");

const processWishEvent = async (event) => {
  if (event.type === "WishCreated") {
  
    const { _id } = event.data;

    // Wunsch in MongoDB aktualisieren
    const updatedWish = await Wish.findByIdAndUpdate(
      _id,
      { status: "In Bearbeitung" },
      { new: true }
    );

    if (!updatedWish) {
      throw new Error(`Wunsch mit _id ${_id} nicht gefunden`);
    }

    console.log(`Wunsch ${_id} wurde auf 'In Bearbeitung' aktualisiert.`);
  }
};

module.exports = { processWishEvent };
