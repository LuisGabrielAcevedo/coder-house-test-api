const config = {
  server: {
    name: "Coder house server",
    port: process.env.PORT || 3200,
  },
  db: {
    name: "Coder house db",
    url: "mongodb://musicaga:coderhouse123@ds351428.mlab.com:51428/coder-house",
    params: { useNewUrlParser: true, useUnifiedTopology: true },
  },
};

module.exports = config;
