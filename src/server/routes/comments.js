const router = require("express").Router();
const Card = require("../models/Card");
const Comment = require("../models/Comment");

router.get("/", (req, res) => {
  Card.findById(req.params.id)
    .then(comments => res.json(comments))
    .catch(err => res.json(err));
});

router.post("/", (req, res) => {
  Card.findById(req.params.id)
    .then(
      Comment.create(req.body)
        .then(comment => res.json(comment))
        .catch(err => res.json(err))
    )
    .catch(err => res.json(err));
});
