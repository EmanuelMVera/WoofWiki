const axios = require("axios");
const { API_KEY } = process.env;
const DOG_API_URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

// Función para obtener razas de la API
async function getBreedsFromAPI() {
  try {
    const response = await axios.get(DOG_API_URL);
    return response.data.map(({ id, image, name, weight, temperament }) => ({
      id,
      image: image.url,
      name,
      weight: weight.metric
        ?.split(" - ")
        .map((weight) => (weight === "NaN" ? 0 : weight)),
      temperament: temperament
        ? temperament.split(", ")
        : "Sin Temperamento Registrado",
      created: false,
    }));
  } catch (error) {
    throw new Error("Error al obtener datos de la API");
  }
}

module.exports = {
  getBreedsFromAPI,
};
