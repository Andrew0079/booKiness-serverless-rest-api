const express = require("express");
const router = express.Router();
const OrganisationController = require("../controller/organisation");

router.post("/", async (req, res) => {
  const organisationController = new OrganisationController();
  const newOrganisation = await organisationController.create(req)
  return res.status(200).send(newOrganisation);
});


module.exports = router;
