const express = require("express");
const router = express.Router();
const CheckController = require("../controller/check");

router.post("/", async (req, res) => {
  const checkController = new CheckController();
  const isExist = await checkController.check(req)
  return res.status(200).send(isExist);
});


module.exports = router;
