const User = require("./User");
const Events = require("./Events");
const EventAttend = require("./EventAttend");
const EventTags = require("./EventTags");

User.hasMany(Events, { as: "ownerID" });

User.hasMany(EventAttend);

Events.hasMany(EventAttend);

Events.hasMany(EventTags);

module.export = {
  User,
  Events,
  EventAttend,
  EventTags,
};
