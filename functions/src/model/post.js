const db = require("../config/db");
const collectionConstant = require("../config/collectionConstant");
const { v4: uuidv4 } = require("uuid");

class PostModel {
  async createPost(userId, content, graphData, organisationId, userPhotoUrl, username) {
    try {
      const { post } = collectionConstant;
      let postId = uuidv4();
      let isDocumentIdExist = await db.collection(post).doc(postId).get();
      while (isDocumentIdExist.exists) {
        postId = uuidv4();
        isDocumentIdExist = await db.collection(post).doc(postId).get();
      }
      await db.collection(post).doc(postId).set({
        userId,
        content,
        graphData,
        organisationId,
        userPhotoUrl,
        username,
        time: Date.now()
      });
      return { state: true };
    } catch (error) {
      return { state: false, errorMessage: "Operation Failed!" };
    }
  }
}

module.exports = PostModel;
