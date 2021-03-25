const PostModel = require("../model/post");

class PostController extends PostModel {
  async create(request) {
    try {
      if (
        (request?.body?.graphData,
        request?.body?.content,
        request?.params?.userId,
        request?.params?.organisationId)
      ) {
        return this.createPost(
          request.params.userId,
          request.body.content,
          request.body.graphData,
          request.params.organisationId
        );
      } else {
        return { state: false, errorMessage: "Request field is missing." };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }
}

module.exports = PostController;
