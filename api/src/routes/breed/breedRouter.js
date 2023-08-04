const express = require("express");
const router = express.Router();

const { validateBreed } = require("./breedMiddleware");
const { addDogBreedToDatabase } = require("./breedController");

router.post("/dog", validateBreed, addDogBreedToDatabase);

module.exports = router;
