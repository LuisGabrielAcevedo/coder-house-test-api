const User = require("../models/user");
const db = require("../helpers/db");

// 1. User controller
function user(req, res) {
  res.status(200).send({ msg: "Users controller works" });
}

// 2. Save user
async function saveUser(req, res) {
  try {
    // Validate email repeated
    req.body.email = req.body.email.toLowerCase();
    await validateEmail(req.body.email);
    // Save data
    const resp = await db.save({
      data: req.body,
      collection: User,
      successMessage: "User saved successfully",
    });
    return res.status(resp.code).send(resp);
  } catch (err) {
    return res.status(err.code).send(err);
  }
}

// 3. Get users
async function getUsers(req, res) {
  const payload = {
    collection: User,
    query: req.query.query,
    sort: req.query.sort,
    pagination: req.query.pagination,
    populateFields: req.query.populate,
    successMessage: "Users searched successfully",
  };
  try {
    const resp = await db.getCollection(payload);
    return res.status(resp.code).send(resp);
  } catch (err) {
    return res.status(err.code).send(err);
  }
}

function validateEmail(email) {
  return new Promise((resolve, reject) => {
    User.find({})
      .or([{ email: email }])
      .exec((err, dataBaseResp) => {
        if (err)
          return reject({
            success: false,
            code: 500,
            msg: "Data base error",
          });
        if (dataBaseResp && dataBaseResp.length >= 1)
          return reject({
            success: true,
            code: 422,
            msg: `The user already exists`,
          });
        resolve(dataBaseResp);
      });
  });
}

module.exports = {
  user,
  saveUser,
  getUsers,
};
