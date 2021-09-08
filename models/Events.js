

const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Events extends Model {}

Events.init(
  {
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "user_id",
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "eventtags",
        key: "tag_id",
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
    event_image: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: false,
    modelName: "events",
  }
);

module.exports = Events;


