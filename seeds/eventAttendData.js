const { EventAttend } = require("../models");

const eventattenddata = [
  {
    event_id: "1",
    attendee: "2",
  },
  {
    event_id: "1",
    attendee: "3",
  },
  {
    event_id: "1",
    attendee: "4",
  },
  {
    event_id: "2",
    attendee: "1",
  },
];

const seedEventAttend = () => EventAttend.bulkCreate(eventattenddata);

module.exports = seedEventAttend;
