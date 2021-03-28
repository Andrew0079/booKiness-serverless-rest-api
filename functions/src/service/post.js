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


module.exports = router;