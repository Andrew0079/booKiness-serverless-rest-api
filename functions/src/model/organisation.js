const db = require("../config/db");
const collectionConstant = require("../config/collectionConstant");
const { v4: uuidv4 } = require("uuid");

class OrganisationModel {
  async createOrganisation({organisationName,organisationEmail,organisationPhone,}) {
    try {
      const { organisation } = collectionConstant;
      let organisationId = uuidv4();
      let isDocumentIdExist = await db.collection(organisation).doc(organisationId).get();
      while (isDocumentIdExist.exists) {
        organisationId = uuidv4();
        isDocumentIdExist = await db.collection(organisation).doc(organisationId).get();
      }
      await db.collection(organisation).doc(organisationId).set({ organisationName, organisationEmail: organisationEmail.toLowerCase(), organisationPhone });
      return { state: true, organisationId };
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }
}

module.exports = OrganisationModel;
