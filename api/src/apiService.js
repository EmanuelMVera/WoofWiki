const axios = require("axios");
const { Temperament } = require("./db.js");

async function preloadTemperaments(apiKey) {
  try {
    const preloadedTemperaments = await Temperament.findAll();

    if (preloadedTemperaments.length === 0) {
      const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds`, {
        params: {
          api_key: apiKey,
        },
      });

      const uniqueTemperaments = [
        ...new Set(data.flatMap(({ temperament }) => temperament?.split(", "))),
      ]
        .filter(Boolean)
        .map((name) => ({ name }));

      await Temperament.bulkCreate(uniqueTemperaments);
    }
  } catch (err) {
    throw new Error("Error preloading temperaments from API.");
  }
}

module.exports = {
  preloadTemperaments,
};
