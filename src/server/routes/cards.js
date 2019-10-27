const router = require("express").Router();
const Card = require("../models/Card");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

router.get("/", (req, res) => {
  Card.find()
    .then(cards => res.json(cards))
    .catch(err => res.json(err));
});

router.get("/:id", (req, res) => {
  Card.find({ _id: req.params.id })
    .then(card => res.json(card))
    .catch(err => res.json(err));
});

router.post("/", (req, res) => {
  Card.create(req.body)
    .then(card => res.json(card))
    .catch(err => res.json(err));
});

router.delete("/:id", (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then(card => res.json(card))
    .catch(err => res.json(err));
});

router.patch("/:id", (req, res) => {
  Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(card => res.json(card))
    .catch(err => res.json(err));
});

// @route    POST /:id/comment
// @desc     Comment on a news
// @access   Private
router.post(
  "/:id/comments",
  [
    auth,
    [
      check("comment", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const card = await Card.findById(req.params.id);

      const newComment = {
        comment: req.body.comment,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      card.comments.push(newComment);
      await card.save();
      res.json(card);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE /:id/comment/:comment_id
// @desc     Comment on a news
// @access   Private
router.delete("/:id/comments/:comment_id", auth, async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);

    //Get comment by id
    const deleteComment = card.comments.find(
      comment => comment.id === req.params.comment_id
    );

    //If comment doesnt exist
    if (!deleteComment) {
      return res.status(400).json({ msg: "Comment does not exist" });
    }

    //Check  user
    if (deleteComment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    //Get remove index
    const removeIndex = card.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    card.comments.splice(removeIndex, 1);

    await card.save();

    res.json(card);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    GET /:id/comments
// @desc     Get comments of a particular card by id
// @access   Public
router.get("/:id/comments", (req, res) => {
  Card.findById(req.params.id)
    .then(card => {
      const comments = card.comments;
      res.json(comments);
    })
    .catch(err => res.json(err));
});

// @route    PATCH /:id/comments/:comment_id
// @desc     Patch a comment after edit
// @access   Private

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
module.exports = router;
