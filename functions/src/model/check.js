const db = require("../config/db");
const collectionConstant = require("../config/collectionConstant");

class CheckModel {
  
  async isEmailExist(newEmail) {
    try {
      const { user, organisation } = collectionConstant;
      const snapshotUser = await db.collection(user).where("email", "==", newEmail).get();
      const snapshotOrganisation = await db.collection(organisation).where("organisationEmail", "==", newEmail).get();
      if (snapshotUser.empty && snapshotOrganisation.empty) {
        return { state: true };
      } else {
        return {
          state: false,
          errorMessage: "Email is already in use by another account.",
        };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async isUsernameExist(newUsername) {
    try {
      const { user, organisation } = collectionConstant;
      const snapshotUser = await db.collection(user).where("username", "==", newUsername).get();
      const snapshotOrganisation = await db.collection(organisation).where("organisationName", "==", newUsername).get();
      if (snapshotUser.empty && snapshotOrganisation.empty) {
        return { state: true };
      } else {
        return {
          state: false,
          errorMessage: "Username is already in use by another account.",
        };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async isOrganisationIdExist(organisationId) {
    try {
      const { organisation } = collectionConstant;
      const isOrganisationExist = await db.collection(organisation).doc(organisationId).get();
      if (isOrganisationExist.exists) {
        return { state: true };
      } else {
        return {
          state: false,
          errorMessage: "Organisation does not exist.",
        };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }
}

module.exports = CheckModel;
