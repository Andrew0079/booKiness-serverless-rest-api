const db = require("../config/db");
const collectionConstant = require("../config/collectionConstant");
const { user, post } = collectionConstant;

class UserModel {
  async createUser(
    username,
    email,
    accountType,
    organisationId,
    currentUserId
  ) {
    try {
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
      const snapshot = await db.collection(user).doc(userId).get();
      return { state: true, user: snapshot.data() };
    } catch (error) {
      return { state: false, errorMessage: "Operation Failed!" };
    }
  }

  async findUsersInOrganisation(organisationId) {
    try {
      const snapshotUsersInOrganisation = await db
        .collection(user)
        .where("organisationId", "==", organisationId)
        .get();
      const usersInOrganisation = snapshotUsersInOrganisation.docs.map(
        (doc) => {
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
      if(userDetailContainer?.photoURL) {
        const userPhotoUrl = { userPhotoUrl: userDetailContainer.photoURL }
        const batch = db.batch()
        await db.collection(user).doc(userId).set(userDetailContainer, { merge: true } );
        const usersPost = await db.collection(post).where("userId", "==", userId).get();
        usersPost.docs.forEach((doc) => batch.update(doc.ref, userPhotoUrl));
        await batch.commit();
        return { state: true };
      } else {
        await db.collection(user).doc(userId).set(userDetailContainer, { merge: true } );
        return { state: true };
      }
    } catch (error) {
      return { state: false, errorMessage: "Operation Failed!" };
    }
  }
}

module.exports = UserModel;
