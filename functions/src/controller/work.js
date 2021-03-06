const WorkModel = require("../model/work");

class WorkController extends WorkModel {
  async create(request) {
    try {
      if (request?.body?.date && request?.body?.employeeId && request?.body?.startTime && request?.body?.finishTime && request?.body?.event && request?.body?.employerId && request?.body?.username && request?.body?.photoURL) {
        return this.createWork({...request.body, ...request.params});
      } else {
        return {
          state: false,
          errorMessage: "Operation Failed!",
        };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async update(request) {
    try {
      if (request?.body?.date && request?.body?.employeeId && request?.body?.startTime && request?.body?.finishTime && request?.body?.event && request?.body?.employerId && request?.body?.username && request?.body?.photoURL && request?.params?.eventId) {
        return this.updateWork({...request.body, ...request.params});
      } else {
        return {
          state: false,
          errorMessage: "Operation Failed!",
        };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }

  async delete(request) {
    try {
      if (request?.params?.workId){
        return this.deleteWork(request.params.workId);
      } else {
        return {
          state: false,
          errorMessage: "Operation Failed!",
        };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }
}

module.exports = WorkController;
