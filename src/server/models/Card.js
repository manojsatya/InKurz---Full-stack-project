const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comment: String
});

const Card = mongoose.model("Card", {
  title: String,
  url: String,
  urlToImage: String,
  author: String,
  description: String,
  content: String,
  isBookmarked: Boolean,
  comments: [commentSchema]
});

module.exports = Card;
