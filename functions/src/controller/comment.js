const CommentModel = require("../model/comment");

class CommentController extends CommentModel {
  
  async create(request) {
    try {
      if (request?.params?.postId && request?.params?.userId && request?.body?.commentText && request?.body?.username && request.body.userPhotoUrl) {
          return this.createComment(request.params.postId, request.params.userId, request.body.commentText, request.body.username, request.body.userPhotoUrl)
      } else {
        return { state: false, errorMessage: "Request body is missing." };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }
}

module.exports = CommentController;
