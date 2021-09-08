const User = require("./User");
const EventAttend = require("./EventAttend");
const EventTags = require("./EventTags");
const Events = require("./Events");

User.hasMany(Events, { foreignKey: "owner_id" });

User.hasMany(EventAttend, { foreignKey: "attendee" });

Events.hasMany(EventAttend, { foreignKey: "event_id" });

EventTags.hasMany(Events, {
  foreignKey: "tag_id",
});

module.exports = {
  User,
  Events,
  EventAttend,
  EventTags,
};
