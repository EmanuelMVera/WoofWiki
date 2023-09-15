const axios = require("axios");
const { BREEDS_API_URL } = require("../../config/constants");

// Función para obtener razas de la API
async function getBreedsFromAPI() {
  try {
    const response = await axios.get(BREEDS_API_URL);
    return response.data.map(
      ({ id, image, name, life_span, weight, height, temperament }) => ({
        id,
        image: image.url,
        name,
        life_span,
        weight: weight.metric
          ?.split(" - ")
          .map((weight) => (weight === "NaN" ? 0 : parseFloat(weight))),
        height: height.metric
          ?.split(" - ")
          .map((height) => (height === "NaN" ? 0 : parseFloat(height))),
        temperament: temperament
          ? temperament.split(", ")
          : "Sin Temperamento Registrado",
        created: false,
      })
    );
  } catch (error) {
    throw new Error("Error al obtener datos de la API");
  }
}

module.exports = {
  getBreedsFromAPI,
};
