const express = require("express");
const router = require("./routes/index");
const pool = require("./infra/connection");
const Tables = require("./infra/Table");

pool.connect((error) => {
  if (error) {
    console.log(error);
  }

  Tables.init(pool);
  const app = express();
  app.use(express.json());
  app.use(router);

  app.listen(3000, () => {
    console.log("Server is running!");
  });
});
