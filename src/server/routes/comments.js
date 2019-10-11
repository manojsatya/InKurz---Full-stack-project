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
      card.save().then(res.json(card));
    })
    .catch(err => res.json(err));
});

router.delete("/:id/comments/", (req, res) => {
  const id = req.body;

  // console.log(id._id);
  Card.findById(req.params.id).then(card => {
    // const list = card.comments.filter(comment => {
    //   console.log("***");
    //   console.log(comment._id);
    //   console.log(id._id);
    //   console.log("***");
    //   return comment._id !== id._id;
    // });
    const index = card.comments
      .map(comment => {
        return comment._id;
      })
      .indexOf(id._id);
    card.comments.splice(index, 1);
    console.log(card.comments);
  });
});

module.exports = router;
