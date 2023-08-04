const server = require("./src/app.js");
const { conn, Temperament } = require("./src/db.js");
const axios = require("axios");
const { YOUR_API_KEY } = process.env;

(async () => {
  try {
    // Syncing all the models at once.
    await conn.sync({ force: true });

    // Extracción, aplanamiento y separación
    const { data } = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
    );
    const temperaments = [
      ...new Set(data.flatMap(({ temperament }) => temperament?.split(", "))),
    ];

    // Convertir en objetos
    const temperamentObjects = temperaments
      .filter(Boolean)
      .map((name) => ({ name }));

    // Guardar en db
    await Temperament.bulkCreate(temperamentObjects);

    server.listen(3001, () => {
      console.log(">>>>Listening at 3001");
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
