const PostModel = require("../model/post");

class PostController extends PostModel {

  async create(request) {
    try {
      if (request?.params?.userId && request?.params?.organisationId && request?.body) {
        return this.createPost({...request.body, ...request.params});
      } else {
        return { state: false, errorMessage: "Operation Failed!" };
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
        return { state: false, errorMessage: "Operation Failed!" };
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
        return { state: false, errorMessage: "Operation Failed!" };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async createComment(request) {
    try {
      if (request?.params?.postId && request?.params?.userId && request?.body?.commentText && request?.body?.username && request?.body?.photoURL) {
        return this.addComment({ ...request.params, ...request.body, time: Date.now() }, request.params.postId);
      } else {
        return { state: false, errorMessage: "Operation Failed!" };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async deleteComment(request) {
    try {
      if (request?.params?.postId && request?.params?.commentId) {
        return this.removeComment({...request.params});
      } else {
        return { state: false, errorMessage: "Operation Failed!" };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }
}

module.exports = PostController;
