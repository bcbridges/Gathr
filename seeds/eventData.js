const { Events } = require("../models");

const eventdata = [
  {
    owner_id: 1,
    tag_id: 1,
    address_1: "1201 Santa Fe Dr.",
    address_2: "Suite A",
    city: "Denver",
    state: "CO",
    postal: "80204",
    time_start: "2021-09-15T08:30:00.000Z",
    time_end: "2021-09-15T09:30:00.000Z",
    event_title: "The Molecule Meetup",
    description:
      "Meeting up at The Molecule Effect coffee shop on Santa Fe! Please mark that you're attending so I know how many seats to get!",
  },
  {
    owner_id: 3,
    tag_id: 2,
    address_1: "1499 E. Louisiana Ave.",
    address_2: "",
    city: "Denver",
    state: "CO",
    postal: "80210",
    time_start: "2021-09-20T16:15:00.000Z",
    time_end: "2021-09-20T17:45:00.000Z",
    event_title: "Wash Park Tennis",
    description: "Let's get our tennis on! Let me know if you need a racket.",
  },
];

const seedEvent = () => Events.bulkCreate(eventdata);

module.exports = seedEvent;
