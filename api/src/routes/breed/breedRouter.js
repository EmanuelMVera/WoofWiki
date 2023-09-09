const express = require("express");
const router = express.Router();

const { validateBreed } = require("./breedMiddleware");
const { addDogBreedToDatabase, getBreeds } = require("./breedController");

router.post("/dog", validateBreed, addDogBreedToDatabase);
router.get("/dog", getBreeds);

module.exports = router;
