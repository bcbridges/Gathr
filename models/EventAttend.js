const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class EventAttend extends Model {}

EventAttend.init(
  {
    event_attend_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "events",
        key: "event_id",
      },
    },
    attendee: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "user_id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: false,
    modelName: "eventattend",
  }
);

module.exports = EventAttend;
