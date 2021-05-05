const express = require("express");
const router = express.Router();
const PostController = require("../controller/post");


router.post("/:organisationId/:userId", async (req, res) => {
  const postController = new PostController();
  const newPost = await postController.create(req)
  return res.status(200).send(newPost);
});

router.post("/create-like/:postId/:userId", async (req, res) => {
  const postController = new PostController();
  const createdLike = await postController.createLike(req)
  return res.status(200).send(createdLike);
});

router.post("/create-comment/:postId/:userId", async (req, res) => {
  const postController = new PostController();
  const createdComment = await postController.createComment(req)
  return res.status(200).send(createdComment);
});

router.post("/delete-comment/:postId/:commentId", async (req, res) => {
  const postController = new PostController();
  const deletedComment = await postController.deleteComment(req)
  return res.status(200).send(deletedComment);
});

router.post("/delete/user/post/:postId", async (req, res) => {
  const postController = new PostController();
  const deletedPost= await postController.delete(req)
  return res.status(200).send(deletedPost);
});

module.exports = router;