const { User } = require("../models");

const userdata = [
  {
    email: "bbridges@gmail.com",
    password: "theCowWasJumping5814$",
    first_name: "Brice",
    last_name: "Bridges",
    postal: 80111,
  },
  {
    email: "cspeer@yahoo.com",
    password: "blackFox5691highKnees",
    first_name: "Chelsea",
    last_name: "Speer",
    postal: 80014,
  },
  {
    email: "mhasz@gmail.com",
    password: "5973!!OlympicRunner",
    first_name: "Megan",
    last_name: "Hasz",
    postal: 80123,
  },
  {
    email: "kanaya@outlook.com",
    password: "682fsniefo*&*jfies!",
    first_name: "Kelsea",
    last_name: "Anaya",
    postal: 80204,
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
