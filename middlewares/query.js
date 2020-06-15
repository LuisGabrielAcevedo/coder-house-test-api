// Middleware to format front-end request

function middleware(req, res, next) {
  // 1. Set Pagination
  if (req.query.page || req.query.itemsPerPage) {
    req.query.pagination = {
      page: req.query.page ? Number(req.query.page) : 1,
      itemsPerPage: req.query.itemsPerPage
        ? Number(req.query.itemsPerPage)
        : 10,
    };
  } else {
    req.query.pagination = null;
  }

  // 2.Set Sort
  req.query.sort = req.query.sort ? req.query.sort : "-updatedAt";

  // 3. Set populate fields
  req.query.populate = req.query.populate
    ? populateQuery(req.query.populate)
    : [];

  // 4. Set search query
  req.query.query =
    req.query.search || req.query.filter
      ? query(req.query.search, req.query.filter, req.route.path.split("/")[1])
      : {};

  // 5. Next
  next();
}

function populateQuery(populate) {
  let populateQuery = [];
  const populateFirstSplit = populate.split(",");
  for (const field in populateFirstSplit) {
    if (populateFirstSplit[field]) {
      const populateSecondSplit = populateFirstSplit[field].split(".");
      let populateObject = new Object();
      if (populateSecondSplit.length === 1) {
        populateObject.path = populateSecondSplit[0];
        populateObject.select = { __v: 0 };
        populateQuery.push(populateObject);
      } else if (populateSecondSplit.length > 1) {
        populateObject.path = populateSecondSplit[0];
        populateObject.select = { __v: 0 };
        populateObject.populate = [
          {
            path: populateSecondSplit[1],
            select: { __v: 0 },
          },
        ];
        populateQuery.push(populateObject);
      }
    }
  }
  return populateQuery;
}

const searchBy = {
  users: ["email", "lastName", "firstName"],
  tasks: ["title", "description"],
};

function query(search, filters, searchRoute) {
  if (searchRoute.includes("-")) {
    searchRoute = searchRoute.split("-").join("");
  }
  const searchFields = searchBy[searchRoute];
  let orParams = [];
  const andParams = filters ? filters : {};
  let query;
  if (search) {
    const searchExpresion = new RegExp(search, "i");
    searchFields.forEach((element) => {
      let obj = new Object();
      obj[element] = searchExpresion;
      orParams.push(obj);
    });
    query = {
      $and: [
        {
          $or: orParams,
        },
        andParams,
      ],
    };
  } else {
    query = {
      $and: [andParams],
    };
  }
  return query;
}

module.exports = {
  middleware,
};
