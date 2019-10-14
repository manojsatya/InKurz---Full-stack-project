const router = require("express").Router();
const Card = require("../models/Card");

router.get("/:id/comments", (req, res) => {
  Card.findById(req.params.id)
    .then(card => {
      const comments = card.comments;
      res.json(comments);
    })
    .catch(err => res.json(err));
});

router.post("/:id", (req, res) => {
  Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(card => {
      const newComment = card.comments.create(req.body);
      card.comments.push(newComment);
      card.save().then(() => res.json(card));
    })
    .catch(err => res.json(err));
});

router.patch("/:id/comments/:comment_id", (req, res) => {
  Card.findByIdAndUpdate(req.params.id)
    .then(card => {
      const editedComment = card.comments.filter(comment => {
        return comment._id.toString() === req.params.comment_id;
      });
      editedComment[0].comment = req.body.comment;
      card.save().then(() => res.json(card));
    })
    .catch(err => res.json(err));
});

router.delete("/:id/comments/:comment_id", (req, res) => {
  Card.findByIdAndUpdate(req.params.id)
    .then(card => {
      const list = card.comments.filter(
        comment => comment._id.toString() !== req.params.comment_id
      );
      card.comments = list;
      card.save().then(() => res.json(card));
    })
    .catch(err => res.json(err));
});

module.exports = router;
