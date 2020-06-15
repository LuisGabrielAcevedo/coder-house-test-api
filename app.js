"use strict";

// 1. Express
const express = require("express");
const app = express();

// 2. Body parser
const body_parser = require("body-parser");
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

// 3. Routes
const userRoutes = require("./routes/user");
app.use("/v1", userRoutes);
const taskRoutes = require("./routes/task");
app.use("/v1", taskRoutes);

// 4. Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

module.exports = app;
