const User = require("./User");
const EventAttend = require("./EventAttend");
const EventTags = require("./EventTags");
const Events = require("./Events");

User.hasMany(Events, { foreignKey: "owner_id" });
Events.belongsTo(User, { foreignKey: "owner_id" });

User.hasMany(EventAttend, { foreignKey: "attendee" });
EventAttend.belongsTo(User, { foreignKey: "attendee" });

Events.hasMany(EventAttend, { foreignKey: "event_id" });
EventAttend.belongsTo(Events, { foreignKey: "event_id" });

EventTags.hasMany(Events, { foreignKey: "tag_id" });
Events.belongsTo(EventTags, { foreignKey: "tag_id" });

module.exports = {
  User,
  Events,
  EventAttend,
  EventTags,
};
