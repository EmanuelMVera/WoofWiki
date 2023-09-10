const { Breed, Temperament } = require("../../db.js");
const httpStatus = require("http-status-codes");
const { getBreedsFromAPI } = require("../../services/breedAPIService.js");
const {
  getBreedsFromDatabase,
} = require("../../services/breedDBService.js");

const addDogBreedToDatabase = async (req, res, next) => {
  try {
    const { name, image, life_span, height, weight, tempId } = req.body;

    const createdBreed = await Breed.create({
      name,
      image,
      life_span,
      height,
      weight,
      created: true,
    });

    const temperaments = await Temperament.findAll({
      where: { id: tempId },
    });

    for (const temp of temperaments) {
      await temp.addBreed(createdBreed.id);
    }

    res.status(httpStatus.CREATED).json(createdBreed);
  } catch (err) {
    console.error(err);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    next(err);
  }
};

const getBreeds = async (req, res, next) => {
  try {
    const [breedsDb, breedsApi] = await Promise.all([
      getBreedsFromDatabase(),
      getBreedsFromAPI(),
    ]);

    const allBreeds = [...breedsDb, ...breedsApi];
    res.json(allBreeds);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  addDogBreedToDatabase,
  getBreeds,
};
