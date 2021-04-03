const db = require("../config/db");
const collectionConstant = require("../config/collectionConstant");
const { v4: uuidv4 } = require("uuid");
const { comment } = collectionConstant;

class CommentModel {
  async createComment(postId, userId, commentText, username, photoUrl) {
    try {
      let commentId = uuidv4();
      let isDocumentIdExist = await db.collection(comment).doc(commentId).get();
      while (isDocumentIdExist.exists) {
        commentId = uuidv4();
        isDocumentIdExist = await db.collection(comment).doc(commentId).get();
      }
      await db.collection(comment).doc(commentId).set({ postId, userId, commentText, username, photoUrl });
      return { state: true };
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }
}

module.exports = CommentModel;
