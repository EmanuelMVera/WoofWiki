const axios = require("axios");
const { Temperament } = require("./db.js");

async function preloadTemperaments(apiKey) {
  try {
    const preloadedTemperaments = await Temperament.findAll();

    if (preloadedTemperaments.length === 0) {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${apiKey}`
      );

      const temperamentsFromApi = data.flatMap(({ temperament }) =>
        temperament?.split(", ")
      );

      const uniqueTemperaments = temperamentsFromApi
        .filter(
          (temp, index) => temp && temperamentsFromApi.indexOf(temp) === index
        )
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
