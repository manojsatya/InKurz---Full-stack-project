const router = require("express").Router();
const Review = require("../models/Review");

router.get("/", (req, res) => {
  Review.find()
    .then(reviews => res.json(reviews))
    .catch(err => res.json(err));
});

router.get("/reviews/:id", (req, res) => {
  Review.find()
    .then(review => res.json(review))
    .catch(err => res.json(err));
});

router.post("/", (req, res) => {
  Review.create(req.body)
    .then(review => res.json(review))
    .catch(err => res.json(err));
});

module.exports = router;
