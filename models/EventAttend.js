const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class EventAttend extends Model {}

EventAttend.init(
  {
    event_AttendID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    eventID: {
      type: DataTypes.INTEGER,
      references: {
        model: "events",
        key: "eventID",
      },
    },
    attendee: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "userID",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "eventattend",
  }
);

module.exports = EventAttend;
