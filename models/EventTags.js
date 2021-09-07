const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class EventTags extends Model {}

EventTags.init(
  {
    tagID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tag_description: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate that users aren't seaching for innappropriate keywords
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "eventtags",
  }
);

module.exports = EventTags;
