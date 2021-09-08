const sequelize = require("../config/connection");
const seedUser = require("./userData");
const seedEvent = require("./eventData");
const seedEventAttend = require("./eventAttendData");
const seedEventTag = require("./eventTagData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  // Loops through to seed all data from the concurrent js files
  await seedUser();
  await seedEventTag();
  await seedEvent();
  await seedEventAttend();

  process.exit(0);
};

seedAll();
