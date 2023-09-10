const { Temperament } = require("../db.js");
const { BREEDS_API_URL } = require("../../config/constants.js");
const axios = require("axios");

// Función para obtener y guardar los temperamentos en la base de datos
async function fetchAndSaveTemperaments() {
  try {
    const { data } = await axios.get(BREEDS_API_URL);

    // Extraer, aplanar y separar los temperamentos
    const temperaments = [
      ...new Set(data.flatMap(({ temperament }) => temperament?.split(", "))),
    ];

    // Convertir en objetos
    const temperamentObjects = temperaments
      .filter(Boolean)
      .map((name) => ({ name }));

    // Guardar en la base de datos
    await Temperament.bulkCreate(temperamentObjects);
  } catch (error) {
    console.error(
      "An error occurred while fetching and saving temperaments:",
      error
    );
    throw error;
  }
}

module.exports = {
  fetchAndSaveTemperaments,
};
