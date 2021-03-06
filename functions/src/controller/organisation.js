const OrganisationModel = require("../model/organisation");

class OrganisationController extends OrganisationModel {

  async create(request) {
    try {
      if(request?.body?.organisationName && request?.body?.organisationEmail && request?.body?.organisationPhone) {
        return this.createOrganisation(request.body.organisationName, request.body.organisationEmail, request.body.organisationPhone);
      } else {
        return { state: false, errorMessage: "Operation Failed!" };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async update(request) {
    try {
      let organisationDetailContainer = {}
      if (request?.body?.organisationName && request?.params?.organisationId) {
        organisationDetailContainer.organisationName = request.body.organisationName;
        return this.updateOrganisation(organisationDetailContainer, request.params.organisationId);
      } else if (request?.body?.organisationPhone && request?.params?.organisationId) {
        organisationDetailContainer.organisationPhone = request.body.organisationPhone;
        return this.updateOrganisation(organisationDetailContainer, request.params.organisationId);
      } else if (request?.body?.organisationAddress && request?.params?.organisationId) {
        organisationDetailContainer.organisationAddress = request.body.organisationAddress;
        return this.updateOrganisation(organisationDetailContainer, request.params.organisationId);
      } else if (request?.body?.organisationPhotoURL && request?.params?.organisationId) {
        organisationDetailContainer.organisationPhotoURL = request.body.organisationPhotoURL;
        return this.updateOrganisation(organisationDetailContainer, request.params.organisationId);
      } else {
        return { state: false, errorMessage: "Operation Failed!" };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }
}

module.exports = OrganisationController;
