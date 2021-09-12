const router = require("express").Router();
const { User, EventTags, Events } = require("../../models");
const withAuth = require("../../utils/auth");

//http:localhost:3001/api/event
router.get("/", async (req, res) => {
  // find all eventTags
  // let's include their events?
  try {
    const eventData = await Events.findAll({
      include: [{ model: EventTags }, { model: User }],
    });
    const events = eventData.map((event) => event.get({ plain: true }));
    res.render("all", {
      events,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/new", withAuth, async (req, res) => {
  const tagData = await EventTags.findAll();
  const tags = tagData.map((tag) => tag.get({ plain: true }));
  console.log(tags);
  res.render("newevent", { tags });
});

router.get("/:id", withAuth, async (req, res) => {
  // find a single EventTag by its `id`
  // let's include their event
  try {
    const eventData = await Events.findByPk(req.params.id, {
      include: [{ model: EventTags }, { model: User }],
    });
    const event = eventData.get({ plain: true });
    if (!event) {
      res.status(404).json({ message: "no eventTag found with that id!" });
      return;
    }

    res.render("singleEvent", { event, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/create/new", withAuth, async (req, res) => {
  try {
    res.status(200);
    res.render("newevent");
  } catch {
    res.status(500).json(err);
  }
});

// VALID ROUTE - USED TO CREATE A NEW EVENT - BB
router.post("/", withAuth, async (req, res) => {
  // Reversing user dropdown selection from the description to the id #
  const tagid_lookup = await EventTags.findOne({
    where: {
      tag_description: req.body.tags,
    },
  });
  req.body.tag_id = tagid_lookup.tag_id;

  // Not sure yet how to find current logged in user to make owner_id
  // Thinking to go back to dropdown - use similar methodology to tags above
  req.body.owner_id = req.session.currUser;

  //Created new event
  Events.create({
    owner_id: req.body.owner_id,
    tag_id: req.body.tag_id,
    event_title: req.body.event_title,
    address_1: req.body.addr_1,
    address_2: req.body.addr_2,
    time_start: req.body.start_date,
    time_end: req.body.end_date,
    description: req.body.event_desc,
  })
    .then((newEvent) => {
      res.json(newEvent);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DOUBLE CHECK - PROBABLY DO NOT NEED THIS ROUTE.
router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Events.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedEvent) => {
      res.json(deletedEvent);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
