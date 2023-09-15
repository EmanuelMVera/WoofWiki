const { Breed, Temperament } = require("../db.js");

// Función para obtener razas de la base de datos
async function getBreedsFromDatabase() {
  try {
    const breeds = await Breed.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
      },
    });

    // Mapear y formatear los resultados
    const formattedBreeds = breeds.map((breed) => ({
      id: breed.id,
      image: breed.image,
      name: breed.name,
      life_span: breed.life_span,
      height: breed.height,
      weight: breed.weight,
      created: breed.created,
      temperament: breed.Temperaments.map((temp) => temp.name),
    }));

    return formattedBreeds;
  } catch (error) {
    throw new Error("Error al obtener datos de la base de datos");
  }
}

module.exports = {
  getBreedsFromDatabase,
};
