const express = require("express");
const router = express.Router();
const WorkController = require("../controller/work");

router.post("/", async (req, res) => {
  const workController = new WorkController();
  const newWork = await workController.create(req)
  return res.status(200).send(newWork);
});

module.exports = router;