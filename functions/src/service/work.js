const express = require("express");
const router = express.Router();
const WorkController = require("../controller/work");

router.post("/", async (req, res) => {
  const workController = new WorkController();
  const newWork = await workController.create(req)
  return res.status(200).send(newWork);
});

router.post("/delete/:workId", async (req, res) => {
  const workController = new WorkController();
  const deletedWork = await workController.delete(req)
  return res.status(200).send(deletedWork);
});

module.exports = router;