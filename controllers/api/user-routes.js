const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

// CREATE new user
//http:localhost:3001/api/users
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const dbUserData = await User.create({
      //   username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      postal: req.body.postal,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
//http:localhost:3001/api/users/login
router.post("/login", async (req, res) => {
  console.log("We're hitting the route.");
  console.log(req.body);
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res.render("search")
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
//http:localhost:3001/api/users/logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/search", (req, res) => {
  if (req.session.loggedIn) {
    res.render('search')
  } else {
    res.status(404);
  }
});

module.exports = router;
