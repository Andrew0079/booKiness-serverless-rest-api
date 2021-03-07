const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");


router.post("/", async (req, res) => {
  const userController = new UserController();
  const newUser = await userController.create(req)
  return res.status(200).send(newUser);
});

router.get("/:userId", async (req, res) => {
  const userController = new UserController();
  const user = await userController.find(req)
  return res.status(200).send(user);
});


module.exports = router;
