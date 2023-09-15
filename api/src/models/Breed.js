const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Breed", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: false,
    },
    weight: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
