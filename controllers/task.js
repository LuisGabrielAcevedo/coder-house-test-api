const Task = require("../models/task");
const db = require("../helpers/db");

// 1. Task controller
function task(req, res) {
  res.status(200).send({ msg: "Tasks controller works" });
}

// 2. Save task
async function saveTask(req, res) {
  try {
    req.body.state = "CREATED";
    // Save data
    const resp = await db.save({
      data: req.body,
      collection: Task,
      successMessage: "Task saved successfully",
    });
    return res.status(resp.code).send(resp);
  } catch (err) {
    return res.status(err.code).send(err);
  }
}

// 3. Get tasks
async function getTasks(req, res) {
  const payload = {
    collection: Task,
    query: req.query.query,
    sort: req.query.sort,
    pagination: req.query.pagination,
    populateFields: req.query.populate,
    successMessage: "Task searched successfully",
  };
  try {
    const resp = await db.getCollection(payload);
    return res.status(resp.code).send(resp);
  } catch (err) {
    return res.status(err.code).send(err);
  }
}

// 4. Update task
async function updateTask(req, res) {
  try {
    // 3. Update user
    const resp = await db.update({
      id: req.params.id,
      collection: Task,
      requestData: req.body,
      successMessage: "Task updated successfully",
    });
    return res.status(resp.code).send(resp);
  } catch (err) {
    return res.status(err.code).send(err);
  }
}

// 5. Find task
async function getTask(req, res) {
  const payload = {
    id: req.params.id,
    collection: Task,
    populateFields: req.query.populate,
    successMessage: "Task found successfully",
  };
  try {
    const resp = await db.getDocument(payload);
    return res.status(resp.code).send(resp);
  } catch (err) {
    return res.status(err.code).send(err);
  }
}

// 6. Delete task
async function deleteTask(req, res) {
  const payload = {
    id: req.params.id,
    collection: Task,
    successMessage: "Task deleted successfully",
  };
  try {
    const resp = await db.deleteDocument(payload);
    return res.status(resp.code).send(resp);
  } catch (err) {
    return res.status(err.code).send(err);
  }
}

module.exports = {
  task,
  saveTask,
  getTasks,
  updateTask,
  getTask,
  deleteTask,
};
