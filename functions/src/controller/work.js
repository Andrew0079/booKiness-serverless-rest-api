const WorkModel = require("../model/work");

class WorkController extends WorkModel {
  async create(request) {
    try {
      if (
        (request?.body?.date &&
          request?.body?.employeeId &&
          request?.body?.time &&
          request?.body?.event,
        request?.body?.employerId)
      ) {
        return this.createWork(
          request.body.date,
          request.body.employeeId,
          request.body.time,
          request.body.event,
          request.body.employerId
        );
      } else {
        return {
          state: false,
          errorMessage: "Request body is missing.",
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
          errorMessage: "Request body is missing.",
        };
      }
    } catch (error) {
      return { state: false, errorMessage: error };
    }
  }
}

module.exports = WorkController;
