const express = require("express");
const router = express.Router();
const CommentController = require("../controller/comment");

router.post("/create/:postId/:userId", async (req, res) => {
  const commentController = new CommentController();
  const newComment = await commentController.create(req)
  return res.status(200).send(newComment);
});


module.exports = router;
