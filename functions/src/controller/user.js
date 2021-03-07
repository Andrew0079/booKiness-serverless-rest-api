const UserModel = require("../model/user");

class UserController extends UserModel {
  async find(request) {
    try {
      const userId = request?.params?.userId;
      if (userId) {
        return this.findUser(userId);
      } else {
        return { state: false, errorMessage: "User id is missing." };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async create(request) {
    try {
      if(request?.body?.username, request?.body?.email, request?.body?.accountType, request?.body?.organisationId, request?.body?.currentUserId) {
        return this.createUser(request.body.username, request.body.email, request.body.accountType, request.body.organisationId, request.body.currentUserId)
      } else {
        return { state: false, errorMessage: "Request body field is missing." };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }
}

module.exports = UserController;
