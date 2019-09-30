const router = require("express").Router();
const Card = require("../models/Card");

router.get("/", (req, res) => {
  Card.find()
    .then(cards => res.json(cards))
    .catch(err => res.json(err));
});

module.exports = router;
