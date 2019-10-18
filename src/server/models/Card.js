const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  comment: String,
  commentedAt: {
    type: Date,
    default: Date.now
  }
});

const Card = mongoose.model("Card", {
  title: String,
  url: String,
  urlToImage: String,
  author: String,
  description: String,
  content: String,
  isBookmarked: Boolean,
  category: String,
  country: String,
  comments: [commentSchema]
});

module.exports = Card;
