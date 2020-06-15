const express = require("express");
const taskCtrl = require("../controllers/task");
const api = express.Router();
const query = require("../middlewares/query");

// 1. Tasks controller
api.get("/tasks/controller", taskCtrl.task);
// 2. Save task
api.post("/tasks", taskCtrl.saveTask);
// 3. Get tasks
api.get("/tasks", query.middleware, taskCtrl.getTasks);
// 4. Update task
api.put("/tasks/:id", taskCtrl.updateTask);
// 4. Find task
api.get("/tasks/:id", query.middleware, taskCtrl.getTask);
// 4. Delete task
api.delete("/tasks/:id", taskCtrl.deleteTask);

module.exports = api;
