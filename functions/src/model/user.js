const db = require("../config/db");
const collectionConstant = require("../config/collectionConstant");

class UserModel {
  async createUser(
    username,
    email,
    accountType,
    organisationId,
    currentUserId
  ) {
    try {
      const { user } = collectionConstant;
      await db.collection(user).doc(currentUserId).set({
        email: email.toLowerCase(),
        username: username,
        accountType: accountType,
        organisationId,
      });
      return { state: true };
    } catch (error) {
      return { state: false, errorMessage: "Operation Failed!" };
    }
  }

  async findUser(userId) {
    try {
      const { user } = collectionConstant;
      const snapshot = await db.collection(user).doc(userId).get();
      return { state: true, user: snapshot.data() };
    } catch (error) {
      return { state: false, errorMessage: "Operation Failed!" };
    }
  }

  async findUsersInOrganisation(organisationId) {
    try {
      const { user } = collectionConstant;
      const snapshotUsersInOrganisation = await db
        .collection(user)
        .where("organisationId", "==", organisationId)
        .get();
      const usersInOrganisation = snapshotUsersInOrganisation.docs.map(
        (doc) => {
          console.log(doc.id);
          return doc.data();
        }
      );
      return { state: true, usersInOrganisation };
    } catch (error) {
      return { state: false, errorMessage: "Operation Failed!" };
    }
  }

  async findUsersInOrganisationByAccountType(organisationId, accountType) {
    try {
      const { user } = collectionConstant;
      const snapshotUsersInOrganisationByAccountType = await db
        .collection(user)
        .where("organisationId", "==", organisationId)
        .where("accountType", "==", accountType)
        .get();
      const usersInOrganisationByAccountType = snapshotUsersInOrganisationByAccountType.docs.map(
        (doc) => {
          return {
            userId: doc.id,
            username: doc.data().username,
            email: doc.data().email,
            accountType: doc.data().accountType,
            organisationId: doc.data().organisationId,
          };
        }
      );
      return { state: true, usersInOrganisationByAccountType };
    } catch (error) {
      return { state: false, errorMessage: "Operation Failed!" };
    }
  }

  async updateUserDetails(userDetailContainer, userId) {
    try {
      const { user } = collectionConstant;
      await db.collection(user).doc(userId).set(userDetailContainer, { merge: true } );
      return { state: true };
    } catch (error) {
      return { state: false, errorMessage: "Operation Failed!" };
    }
  }
}

module.exports = UserModel;
