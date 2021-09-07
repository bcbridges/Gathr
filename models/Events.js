const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Events extends Model {}

Events.init(
  {
    eventID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ownerID: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "userID",
      },
    },
    tagID: {
      type: DataTypes.INTEGER,
      references: {
        model: "eventtags",
        key: "tagID",
      },
    },
    address_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [5, 5],
      },
    },
    time_start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time_end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "events",
  }
);

module.exports = Events;
