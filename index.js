"use strict";
const app = require("./app");
const config = require("./config");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

Promise.all([initServerConexion(), initDbConexion()])
  .then((resp) => {
    console.log(resp[0].msg);
    console.log(resp[1].msg);
  })
  .catch((error) => {
    console.log(error);
  });

// 1. Init server
function initServerConexion() {
  return new Promise((resolve, reject) => {
    app.listen(config.server.port, (err, resp) => {
      if (err) reject({ msg: "Server conexion error" });
      resolve({
        msg: `${config.server.name} operating successfully through the port http://localhost:${config.server.port}`,
      });
    });
  });
}

// 2 Init db
function initDbConexion() {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.db.url, config.db.params, (err, res) => {
      if (err) reject({ msg: "Db conexion error" });
      resolve({ msg: `${config.db.name} operating successfully` });
    });
  });
}
