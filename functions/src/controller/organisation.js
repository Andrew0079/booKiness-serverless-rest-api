const OrganisationModel = require("../model/organisation");

class OrganisationController extends OrganisationModel {
  async create(request) {
    try {
      const body = request?.body;
      if (body) {
        if (
          body?.organisationName &&
          body?.organisationEmail &&
          body?.organisationPhone
        ) {
          return this.createOrganisation(body);
        } else {
          return {
            state: false,
            errorMessage: "The property of request body is missing.",
          };
        }
      } else {
        return { state: false, errorMessage: "Request body is missing." };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }
}

module.exports = OrganisationController;
