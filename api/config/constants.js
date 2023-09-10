const { API_KEY } = process.env;

module.exports = {
  BREEDS_API_URL: `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
  PORT: 3001,
};
