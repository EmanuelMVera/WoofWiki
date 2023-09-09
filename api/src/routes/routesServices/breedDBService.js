const { Breed, Temperament } = require("../../db.js");

// Función para obtener razas de la base de datos
async function getBreedsFromDatabase() {
  try {
    return await Breed.findAll({ include: Temperament });
  } catch (error) {
    throw new Error("Error al obtener datos de la base de datos");
  }
}

module.exports = {
  getBreedsFromDatabase,
};
