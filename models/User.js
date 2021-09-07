const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../config/connection.js");

class User extends Model {}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // User's pw will need to be at least 10 characters
        len: [10],
      },
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isAlpha: true,
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isAlpha: true,
      },
    },
    postal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 80204,
      validate: {
        // Must be a valid US ZIP code
        len: [5, 5],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.email = await newUserData.toLowerCase();
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.email = await updatedUserData.email.toLowerCase();
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return updatedUserData;
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: false,
    modelName: "user",
  }
);

module.exports = User;
