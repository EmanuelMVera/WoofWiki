const server = require("./app.js");

function startServer(port) {
  server.listen(port, () => {
    console.log(`>>>Listening at ${port}`);
  });
}

module.exports = {
  startServer,
};
