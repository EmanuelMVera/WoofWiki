const { preloadTemperaments } = require("./src/apiService.js");
const { startServer } = require("./src/server.js");
const { conn } = require("./src/db.js");
const { YOUR_API_KEY } = process.env;

// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(async () => {
    await preloadTemperaments(YOUR_API_KEY);
    startServer(3001);
  })
  .catch((err) => {
    console.error("Error occurred:", err);
  });
