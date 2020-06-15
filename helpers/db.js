const moment = require("moment");
const mongoosePagination = require("mongoose-pagination");

function save(payload) {
  return new Promise((resolve, reject) => {
    let objToSave = new payload.collection();
    // 1. Moment
    objToSave["createdAt"] = moment().toISOString();
    objToSave["updatedAt"] = moment().toISOString();

    // 2. Set values
    for (let field in payload.data) {
      objToSave[field] = payload.data[field];
    }
    // 3. Save
    objToSave.save((err, dataBaseResp) => {
      if (err)
        return reject({
          success: false,
          code: 500,
          msg: "Data base error",
        });
      return resolve({
        success: true,
        code: 200,
        msg: payload.successMessage,
        data: dataBaseResp,
      });
    });
  });
}

function getCollection(payload) {
  return new Promise((resolve, reject) => {
    // 1. Query validate
    const query = payload.query ? payload.query : {};
    // 2. Sort validate
    const sort = payload.sort ? payload.sort : "";
    // 3. Populate fields validate
    const populate = payload.populateFields ? payload.populateFields : "";

    if (payload.pagination) {
      // 4. Page validate
      const page = payload.pagination ? payload.pagination.page : 1;
      // 5. Items per page validate
      const itemsPerPage = payload.pagination
        ? payload.pagination.itemsPerPage
        : 10;
      payload.collection
        .find(query)
        .sort(sort)
        .populate(populate)
        .paginate(page, itemsPerPage, (err, dataBaseResp, totalItems) => {
          if (err)
            return reject({
              success: false,
              code: 500,
              msg: msgError,
            });
          return resolve({
            succes: true,
            code: 200,
            msg: payload.successMessage,
            totalItems: totalItems,
            totalPages: Math.ceil(totalItems / itemsPerPage),
            currentPage: page,
            itemsPerPage: itemsPerPage,
            data: dataBaseResp,
          });
        });
    } else {
      payload.collection
        .find(query)
        .populate(populate)
        .sort(sort)
        .exec((err, dataBaseResp) => {
          if (err)
            return reject({
              success: false,
              code: 500,
              msg: msgError,
            });
          return resolve({
            succes: true,
            code: 200,
            msg: payload.successMessage,
            data: dataBaseResp,
          });
        });
    }
  });
}

function update(payload) {
  return new Promise((resolve, reject) => {
    // 1. Search if id is valid
    payload.collection.findById(payload.id).exec((err, dataBaseResp) => {
      if (err)
        return reject({
          success: false,
          code: 500,
          msg: "Data base error",
        });
      if (!dataBaseResp)
        return reject({
          success: false,
          code: 422,
          msg: `the id ${payload.id} does not exist`,
        });
      // 4. Set values
      for (let element in payload.requestData) {
        if (payload.requestData[element]) {
          dataBaseResp[element] = payload.requestData[element];
        }
      }
      dataBaseResp["updatedAt"] = moment().toISOString();
      payload.collection.findByIdAndUpdate(
        dataBaseResp._id,
        dataBaseResp,
        (err, dataBaseResp1) => {
          if (err)
            return reject({
              success: false,
              code: 422,
              msg: "Data base error",
            });
          return resolve({
            success: true,
            code: 200,
            msg: payload.successMessage,
            data: dataBaseResp,
          });
        }
      );
    });
  });
}

function getDocument(payload) {
  return new Promise((resolve, reject) => {
    // 1. Populate fields validate
    let populate = payload.populateFields ? payload.populateFields : "";
    payload.collection
      .findById(payload.id)
      .populate(populate)
      .exec((err, dataBaseResp) => {
        if (err)
          return reject({
            success: false,
            code: 500,
            msg: "Data base error",
          });
        if (!dataBaseResp)
          return reject({
            success: false,
            code: 422,
            msg: `the id ${payload.id} does not exist`,
          });
        return resolve({
          success: true,
          code: 200,
          msg: payload.successMessage,
          data: dataBaseResp,
        });
      });
  });
}

function deleteDocument(payload) {
  return new Promise((resolve, reject) => {
    payload.collection.findByIdAndRemove(payload.id, (err, dataBaseResp) => {
      if (err)
        return reject({
          success: false,
          code: 500,
          msg: "Data base error",
        });
      if (!dataBaseResp)
        return reject({
          success: false,
          code: 422,
          msg: `The id ${payload.id} does not exist`,
        });
      return resolve({
        status: "OK",
        code: 200,
        msg: payload.successMessage,
        data: dataBaseResp,
      });
    });
  });
}

module.exports = {
  save,
  getCollection,
  update,
  getDocument,
  deleteDocument,
};
