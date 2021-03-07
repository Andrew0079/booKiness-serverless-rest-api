const CheckModel = require("../model/check");

class CheckController extends CheckModel {
  async check(request) {
    try {
      if (request?.body?.newEmail) {
        return this.isEmailExist(request?.body?.newEmail);
      } else if (request?.body?.newUsername) {
        return this.isUsernameExist(request?.body?.newUsername);
      } else if (request?.body?.organisationId) {
        return this.isOrganisationIdExist(request?.body?.organisationId)
      } else {
        return { state: false, errorMessage: "Request body (email) is missing." };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }
}

module.exports = CheckController;
