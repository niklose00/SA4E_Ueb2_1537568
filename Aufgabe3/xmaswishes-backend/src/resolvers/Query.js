const Wish = require("../models/wish");

module.exports = {
  getWishStatus: async (_, { id }) => {
    const wish = await Wish.findById(id);
    if (!wish) {
      throw new Error("Wish not found");
    }
    return wish;
  }
};
