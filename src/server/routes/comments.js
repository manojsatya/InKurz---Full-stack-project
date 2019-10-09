const router = require("express").Router();
const Card = require("../models/Card");
const Comment = require("../models/Comment");

router.get("/", (req, res) => {
  Card.find({ _id: req.params.id })
    .then(comments => res.json(comments))
    .catch(err => res.json(err));
});

router.post("/:id", (req, res) => {
  Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(card => {
      const newComment = card.comments.create(req.body);
      card.comments.push(newComment);
      card.save().then(res.json(card));
    })
    .catch(err => res.json(err));
});

module.exports = router;
