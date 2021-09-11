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

router.get("/new", async (req, res) => {
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

router.get("/create/new", async (req, res) => {
  try {
    res.status(200);
    res.render("newevent");
  } catch {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new tag
  console.log(req.body);
  req.body.owner_id = 1;
  req.body.tag_id = 1;
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

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Events.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedEvent) => {
      res.json(updatedEvent);
    })
    .catch((err) => res.json(err));
});

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
