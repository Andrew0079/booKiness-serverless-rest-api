const PostModel = require("../model/post");

class PostController extends PostModel {

  async create(request) {
    try {
      if (request?.body?.graphData, request?.body?.content, request?.params?.userId, request?.params?.organisationId, request?.body?.userPhotoUrl, request?.body?.username) {
        return this.createPost(request.params.userId, request.body.content, request.body.graphData, request.params.organisationId, request.body.userPhotoUrl, request.body.username);
      } else {
        return { state: false, errorMessage: "Request field is missing." };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async delete(request) {
    try {
      if (request?.params?.postId) {
        return this.deletePost(request.params.postId);
      } else {
        return { state: false, errorMessage: "Request field is missing." };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async createLike(request) {
    try {
      if (request?.params?.postId && request?.params?.userId && request?.body?.like) {
        return this.addLike(request.params.postId, request.params.userId, request.body.like);
      } else {
        return { state: false, errorMessage: "Request field is missing." };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async createComment(request) {
    try {
      if (request?.params?.postId && request?.params?.userId && request?.body?.commentText && request?.body?.username && request?.body?.userPhotoUrl) {
        const commentData = { userId: request.params.userId, commentText: request.body.commentText, username: request.body.username, photoUrl: request.body.userPhotoUrl, time: Date.now() }
        return this.addComment(commentData, request.params.postId);
      } else {
        return { state: false, errorMessage: "Operation Failed!" };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async deleteComment(request) {
    try {
      if (request?.params?.postId && request?.params?.userId && request?.body?.commentText) {
        return this.removeComment(request.params.postId, request.params.userId, request.body.commentText);
      } else {
        return { state: false, errorMessage: "Operation Failed!" };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }
}

module.exports = PostController;
