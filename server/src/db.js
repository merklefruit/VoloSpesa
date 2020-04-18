const monk = require("monk");
const db = monk(
  "mongodb+srv://" +
    process.env.DATABASE_URL +
    "@spesaboomerdb-w90jr.mongodb.net/test?retryWrites=true&w=majority"
);

module.exports = db;
