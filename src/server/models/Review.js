const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  review: String,
  rating: Number,
  reviewedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Review;
