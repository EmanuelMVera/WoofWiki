const { StatusCodes } = require("http-status-codes");
const { Breed } = require("../../db.js");
const Ajv = require("ajv");
const CustomError = require("./customError.js");

const ajv = new Ajv();

// Definir el esquema JSON para validar los datos de raza
const breedSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 50,
      pattern: "^[a-zA-Z\\s]+$",
    },
    height: {
      type: "array",
      items: { type: "number", minimum: 0.1 },
      minItems: 2, // Requerimos un array con al menos dos elementos (min y max)
      maxItems: 2, // Limitamos a dos elementos (min y max)
    },
    weight: {
      type: "array",
      items: { type: "number", minimum: 0.1 },
      minItems: 2, // Requerimos un array con al menos dos elementos (min y max)
      maxItems: 2, // Limitamos a dos elementos (min y max)
    },
  },
  required: ["name", "height", "weight"],
  additionalProperties: true,
};

const validateBreed = async (req, res, next) => {
  const { name, height, weight } = req.body;

  try {
    // Validar el cuerpo de la solicitud contra el esquema
    const isValid = ajv.validate(breedSchema, req.body);
    if (!isValid) {
      throw new CustomError(
        "Invalid breed data",
        "INVALID_BREED_DATA",
        StatusCodes.BAD_REQUEST
      );
    }

    // Verificar si el nombre de la raza ya existe
    const existingBreed = await Breed.findOne({
      where: { name },
    });
    if (existingBreed) {
      throw new CustomError(
        "Breed name already exists",
        "BREED_NAME_EXISTS",
        StatusCodes.CONFLICT
      );
    }

    next();
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: error.message, code: error.code });
  }
};

module.exports = {
  validateBreed,
};
