const path = require("path");
const express = require("express");
const sequelize = require("./config/connection");
const { User, Events, EventTags, EventAttend } = require("./models");

// Do not have any routes atm
// const routes = require("./controllers");

const app = express();
const PORT = process.env.PORT || 3001;

// app.use(routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}.`));
});
