const mongoose = require("mongoose");

const Comment = mongoose.model("Comment", {
  comment: String,
  cardID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card"
    }
  ]
});

module.exports = Comment;
