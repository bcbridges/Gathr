const router = require("express").Router();
const { User, Event, EventAttend } = require("../../models");

//////////////////////
//////////////////////
// WE CURRENTLY DO NOT USE THE EVENT ATTEND ROUTES AT ALL.
//////////////////////
//////////////////////

//http:localhost:3001/api/eventAttend
router.get("/", async (req, res) => {
  // find all eventTags
  // let's include their events?
  try {
    const eventAttendData = await EventAttend.findAll({
      include: [{ model: Event }, { model: User }],
    });
    res.status(200).json(eventAttendData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single EventTag by its `id`
  // let's include their event
  try {
    const eventAttendData = await Event.findByPk(req.params.id, {
      include: [{ model: Event }, { model: User }],
    });
    if (!eventAttendData) {
      res.status(404).json({ message: "no eventTag found with that id!" });
      return;
    }

    res.status(200).json(eventAttendData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  // create a new tag
  Event.create({
    event_id: req.body.event_id,
    attendee: req.body.attendee,
  })
    .then((newEvent) => {
      res.json(newEvent);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Event.update(req.body, {
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
  Event.destroy({
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
