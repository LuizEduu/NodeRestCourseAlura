const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "docker",
  database: "nodeRest",
  port: 5432,
});

module.exports = pool;
