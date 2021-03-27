const db = require("../config/db");
const collectionConstant = require("../config/collectionConstant");
const { v4: uuidv4 } = require("uuid");

class WorkModel {
  async createWork(date, employeeId, time, event, employerId) {
    try {
      const { work } = collectionConstant;
      let workId = uuidv4();
      let isDocumentIdExist = await db.collection(work).doc(workId).get();
      while (isDocumentIdExist.exists) {
        workId = uuidv4();
        isDocumentIdExist = await db.collection(work).doc(workId).get();
      }
      await db
        .collection(work)
        .doc(workId)
        .set({ date, employeeId, time, event, employerId });
      return { state: true };
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }
}

module.exports = WorkModel;