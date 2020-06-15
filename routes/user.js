const express = require("express");
const userCtrl = require("../controllers/user");
const api = express.Router();
const query = require("../middlewares/query");

// 1. Users controller
api.get("/users/controller", userCtrl.user);
// 2. Save user
api.post("/users", userCtrl.saveUser);
// 3. Get users
api.get("/users", query.middleware, userCtrl.getUsers);

module.exports = api;
