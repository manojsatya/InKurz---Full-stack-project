const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  review: String,
  rating: Number
});

module.exports = Review;
