const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const corsConfig = require('./corsConfig.js');

require('./db.js');

const server = express();

server.name = 'API';

server.use(express.urlencoded({ extended: true, limit: '50mb' }), express.json({ limit: '50mb' }), cookieParser(), morgan('dev'));
server.use(corsConfig);
server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
