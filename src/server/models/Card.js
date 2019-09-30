const mongoose = require("mongoose");

const Card = mongoose.model("Card", {
  title: String,
  url: String,
  urlToImage: String,
  author: String,
  description: String,
  content: String,
  isBookmarked: Boolean,
  comments: [String]
});

module.exports = Card;
