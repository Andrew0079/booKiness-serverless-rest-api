const express = require("express");
const router = express.Router();
const PostController = require("../controller/post");


router.post("/:organisationId/:userId", async (req, res) => {
  const postController = new PostController();
  const newPost = await postController.create(req)
  return res.status(200).send(newPost);
});

module.exports = router;