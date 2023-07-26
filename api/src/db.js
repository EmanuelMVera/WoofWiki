require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

// Crear y configurar la instancia de Sequelize
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
  logging: false,
  native: false,
});

// Leer e importar todos los modelos
const modelDefiners = [];
const modelsDir = path.join(__dirname, 'models');

fs.readdirSync(modelsDir)
  .filter(file => file.endsWith('.js'))
  .forEach(file => {
    const modelDefiner = require(path.join(modelsDir, file));
    modelDefiners.push(modelDefiner);
  });

// Inyectar la conexión (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// Definir las relaciones entre modelos
const { Breed, Temperament } = sequelize.models;
Breed.belongsToMany(Temperament, { through: 'BreedTemperament' });
Temperament.belongsToMany(Breed, { through: 'BreedTemperament' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
