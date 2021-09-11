const router = require("express").Router();
const { User, Events, EventTags } = require("../../models");
const bcrypt = require("bcrypt");
const withAuth = require("../../utils/auth");

// CREATE new user
// IS THIS THE ROUTE WE'RE HITTING FOR A NEW USER?? THERE IS NO RES.RENDER
//http:localhost:3001/api/users
router.post("/", async (req, res) => {
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

      res.render("all");
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

router.get("/search/:id", withAuth, async (req, res) => {
  if (req.session.loggedIn) {
    console.log("This is the /search route.");
    const dbEventData = await Events.findAll({
      include: {
        model: EventTags,
        where: {
          tag_description: req.params.id,
        },
      },
    });
    const events = dbEventData.map((event) => event.get({ plain: true }));
    ////// NEED TO EDIT TIME TO BE UI FRIENDLY
    // const edited_start = new Date(req.body.start_date).toLocaleString();
    // const edited_end = new Date(req.body.end_date).toLocaleString();
    // req.body.start_date = edited_start;
    // req.body.end_date = edited_end;

    res.render("all", { events });
  } else {
    res.status(404);
  }
});

module.exports = router;
