const db = require("../config/db");
const collectionConstant = require("../config/collectionConstant");
const { v4: uuidv4 } = require("uuid");
const { work } = collectionConstant;

class WorkModel {
  async createWork({date, employeeId, startTime, finishTime, event, employerId, username, photoURL}) {
    try {
      let workId = uuidv4();
      let isDocumentIdExist = await db.collection(work).doc(workId).get();
      while (isDocumentIdExist.exists) {
        workId = uuidv4();
        isDocumentIdExist = await db.collection(work).doc(workId).get();
      }
      await db.collection(work).doc(workId).set({ date, employeeId, startTime, finishTime, event, employerId, username, photoURL });
      return { state: true };
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async updateWork({date, employeeId, startTime, finishTime, event, employerId, username, photoURL, eventId}) {
    try {
      await db.collection(work).doc(eventId).set({ date, employeeId, startTime, finishTime, event, employerId, username, photoURL }, { merge: true });
      return { state: true };
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async deleteWork(workId) {
    try {
      await db.collection(work).doc(workId).delete()
      return { state: true };
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }
}

module.exports = WorkModel;
