const express = require("express");
const router = express.Router();
const OrganisationController = require("../controller/organisation");

router.post("/", async (req, res) => {
  const organisationController = new OrganisationController();
  const newOrganisation = await organisationController.create(req)
  return res.status(200).send(newOrganisation);
});

router.post("/update-details/:organisationId", async (req, res) => {
  const organisationController = new OrganisationController();
  const updatedOrganisation = await organisationController.update(req)
  return res.status(200).send(updatedOrganisation);
});

module.exports = router;
