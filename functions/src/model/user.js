const db = require("../config/db");
const collectionConstant = require("../config/collectionConstant")

class UserModel {
  async createUser(username, email, accountType, organisationId, currentUserId) {
    try {
      const { user } = collectionConstant
      await db.collection(user).doc(currentUserId).set({ 
        email: email,
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
      const { user } = collectionConstant
      const snapshot = await db.collection(user).doc(userId).get();
      return { state: true, user: snapshot.data() };
    } catch (error) {
      return { state: false, errorMessage: "Operation Failed!" };
    }
  }
}

module.exports = UserModel;
