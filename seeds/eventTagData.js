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
  {
    tag_description: "Board Games",
  },
  {
    tag_description: "Skiing",
  },
  {
    tag_description: "Rollerblading",
  },
  {
    tag_description: "Tech",
  },
  {
    tag_description: "Networking",
  },
  {
    tag_description: "Community Service",
  },
  {
    tag_description: "Community Events",
  },
  {
    tag_description: "Tutoring",
  },
  {
    tag_description: "Reading",
  },
  {
    tag_description: "Movies & Entertainment",
  },
  {
    tag_description: "Music",
  },
  {
    tag_description: "Snow Boarding",
  },
  {
    tag_description: "Hiking",
  },
];

const seedEventTag = () => EventTags.bulkCreate(eventtagsdata);

module.exports = seedEventTag;
