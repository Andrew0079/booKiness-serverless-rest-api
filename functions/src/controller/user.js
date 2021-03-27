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
      if (
        (request?.body?.username,
        request?.body?.email,
        request?.body?.accountType,
        request?.body?.organisationId,
        request?.body?.currentUserId)
      ) {
        return this.createUser(
          request.body.username,
          request.body.email,
          request.body.accountType,
          request.body.organisationId,
          request.body.currentUserId
        );
      } else {
        return { state: false, errorMessage: "Request body field is missing." };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async findUsers(request) {
    try {
      if (request?.params?.organisationId) {
        return this.findUsersInOrganisation(request.params.organisationId);
      } else {
        return { state: false, errorMessage: "Organisation id is missing." };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async findUsersByAccountType(request) {
    try {
      if (request?.params?.organisationId && request?.params?.accountType) {
        return this.findUsersInOrganisationByAccountType(
          request.params.organisationId,
          request.params.accountType
        );
      } else {
        return {
          state: false,
          errorMessage: "Organisation id or account type is missing.",
        };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async update(request) {
    try {
      let userDetailContainer = {}
      if (request?.body?.username && request?.params?.userId) {
        userDetailContainer.username = request.body.username;
        return this.updateUserDetails(userDetailContainer, request.params.userId);
      } else if (request?.body?.name && request?.params?.userId) {
        userDetailContainer.name = request.body.name;
        return this.updateUserDetails(userDetailContainer, request.params.userId);
      } else if (request?.body?.phoneNumber && request?.params?.userId) {
        userDetailContainer.phoneNumber = request.body.phoneNumber;
        return this.updateUserDetails(userDetailContainer, request.params.userId);
      } else if (request?.body?.photoURL && request?.params?.userId) {
        userDetailContainer.photoURL = request.body.photoURL;
        return this.updateUserDetails(userDetailContainer, request.params.userId);
      } else {
        return { state: false, errorMessage: "Request body is missing." };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }
}

module.exports = UserController;
