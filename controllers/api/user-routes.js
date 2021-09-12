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
      req.session.currUser = dbUserData.user_id;
      console.log(req.session);

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
      req.session.currUser = dbUserData.user_id;

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
    const eventClear = events.map((event) => {
      let cleanStart = new Date(event.time_start).toLocaleString();
      event.time_start = cleanStart;
      let cleanEnd = new Date(event.time_end).toLocaleString();
      event.time_end = cleanEnd;
      event.currUser = req.session.currUser;
      event.ownerCheck = event.currUser == event.owner_id;
    });

    console.log(events);
    res.render("all", { events });
  } else {
    res.status(404);
  }
});

module.exports = router;
