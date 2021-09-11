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
  {
    tag_description: "Food",
  },
  {
    tag_description: "Workout",
  },
  {
    tag_description: "Football",
  },
];

const seedEventTag = () => EventTags.bulkCreate(eventtagsdata);

module.exports = seedEventTag;
