const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", async (req, res) => {
  const userController = new UserController();
  const newUser = await userController.create(req)
  return res.status(200).send(newUser);
});

router.post("/update-details/:userId", authMiddleware, async (req, res) => {
  const userController = new UserController();
  const updatedUser = await userController.update(req)
  return res.status(200).send(updatedUser);
});

router.get("/:userId", authMiddleware, async (req, res) => {
  const userController = new UserController();
  const user = await userController.find(req)
  return res.status(200).send(user);
});

router.get("/organisation-users/:organisationId", authMiddleware, async (req, res) => {
  const userController = new UserController();
  const usersInOrganisation = await userController.findUsers(req)
  return res.status(200).send(usersInOrganisation);
});

router.get("/organisation-users-by-account-type/:accountType/:organisationId", authMiddleware, async (req, res) => {
  const userController = new UserController();
  const usersInOrganisationByAccountType = await userController.findUsersByAccountType(req)
  return res.status(200).send(usersInOrganisationByAccountType);
});


module.exports = router;
