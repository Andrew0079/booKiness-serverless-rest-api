const db = require("../config/db");
const collectionConstant = require("../config/collectionConstant");
const { v4: uuidv4 } = require("uuid");
const { post } = collectionConstant;

class PostModel {
  async createPost(postDataContainer) {
    try {
      let postId = uuidv4();
      let isDocumentIdExist = await db.collection(post).doc(postId).get();
      while (isDocumentIdExist.exists) {
        postId = uuidv4();
        isDocumentIdExist = await db.collection(post).doc(postId).get();
      }
      await db.collection(post).doc(postId).set({ ...postDataContainer, time: Date.now()});
      return { state: true };
    } catch (error) {
      return { state: false, errorMessage: "Operation Failed!" };
    }
  }

  async deletePost(postId) {
    try {
      await db.collection(post).doc(postId).delete();
      return { state: true };
    } catch (error) {
      return { state: false, errorMessage: "Operation Failed!" };
    }
  }

  async addLike(postId, userId, like) {
    try {
      const likesContainer = {};
      const currentPost = await db.collection(post).doc(postId).get();
      if (currentPost.exists) {
        if (currentPost.data()?.postLikes) {
          const currentPostLikes = currentPost.data().postLikes.likes;
          likesContainer.likes = parseInt(currentPostLikes) + parseInt(like);
          const currentPostLikeUserIds = currentPost.data().postLikes.userIds;
          if (!currentPostLikeUserIds.includes(userId)) {
            currentPostLikeUserIds.push(userId);
            likesContainer.userIds = currentPostLikeUserIds;
          }
        }
        else {
          likesContainer.likes =  like
          likesContainer.userIds = [userId];
        }
        await db.collection(post).doc(postId).set({ postLikes: likesContainer }, { merge: true })
        return { state: true };
      } else {
        return { state: false, errorMessage: "Operation Failed!" };
      }
    } catch (error) {
      return { state: false, errorMessage: "Operation Failed!" };
    }
  }

  async addComment(commentData, postId) {
    try {
      const commentContainer = []
      const currentPost = await db.collection(post).doc(postId).get();
      if (currentPost.exists) {
        if(currentPost.data()?.postComments) {
          const postCommentsContainer = currentPost.data().postComments
          let commentId = uuidv4();
          let isIdExist = postCommentsContainer.some((comment) => comment?.commentId === commentId)
          while (isIdExist) {
            commentId = uuidv4();
            isIdExist = postCommentsContainer.some((comment) => comment?.commentId === commentId)
          }
          postCommentsContainer.push({...commentData, commentId})
          await db.collection(post).doc(postId).set({ postComments: postCommentsContainer }, { merge: true })
          return { state: true };
        } else {
          let commentId = uuidv4();
          commentContainer.push({...commentData, commentId})
          await db.collection(post).doc(postId).set({ postComments: commentContainer }, { merge: true })
          return { state: true };
        }
      } else { 
        return { state: false, errorMessage: "Operation Failed!" };
      }
    } catch (error) {
      return { state: false, errorMessage: "Operation Failed!" };
    }
  }

  async removeComment({postId, commentId}) {
    try {
      const currentPost = await db.collection(post).doc(postId).get();
      if (currentPost.exists) {
        if(currentPost.data()?.postComments) {
          const postCommentsContainer = currentPost.data().postComments
          const filteredComments = postCommentsContainer.filter((data) => data.commentId !== commentId)
          await db.collection(post).doc(postId).set({ postComments: filteredComments }, { merge: true })
          return { state: true };
        }
      } else { 
        return { state: false, errorMessage: "Operation Failed!" };
      }
    } catch (error) {
      return { state: false, errorMessage: "Operation Failed!" };
    }
  }
}

module.exports = PostModel;
