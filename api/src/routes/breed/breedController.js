const { Breed, Temperament } = require("../../db.js");
const httpStatus = require("http-status-codes");

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

module.exports = {
  addDogBreedToDatabase,
};
