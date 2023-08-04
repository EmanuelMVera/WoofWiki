const express = require("express");
const { urlencoded, json } = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
require("./db.js");

const server = express();
const corsConfig = {
  origin: "http://localhost:3001",
  credentials: true,
  methods: "GET, POST, OPTIONS, PUT, DELETE",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
};

server
  .use(urlencoded({ extended: true, limit: "50mb" }))
  .use(json({ limit: "50mb" }))
  .use(cookieParser())
  .use(morgan("dev"))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", corsConfig.origin);
    res.header("Access-Control-Allow-Credentials", corsConfig.credentials);
    res.header("Access-Control-Allow-Headers", corsConfig.allowedHeaders);
    res.header("Access-Control-Allow-Methods", corsConfig.methods);
    next();
  })
  .use("/api", routes);

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send({ message });
};

server.use(errorHandler);

module.exports = server;
