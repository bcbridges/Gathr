const { EventTags } = require("../models");

const eventtagsdata = [
  {
    tag_description: "Coffee",
  },
  {
    tag_description: "Tennis",
  },
  {
    tag_description: "Running",
  },
];

const seedEventTag = () => EventTags.bulkCreate(eventtagsdata);

module.exports = seedEventTag;
